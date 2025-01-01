<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
    
        $user = auth()->user();
    
        $cartItem = $user->cart()->where('product_id', $request->product_id)->first();
    
        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            $cartItem = $user->cart()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }
    
        return response()->json(['message' => 'Product added to cart.', 'cart' => $cartItem]);
    }
    
    public function checkIfProductInCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = auth()->user();

        $cartItem = $user->cart()->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            return response()->json([
                'result' => true,
                'cart_item' => $cartItem,
            ]);
        } else {
            return response()->json([
                'result' => false,
                'cart_item' => null,
            ]);
        }
    }

    public function decreaseQuantity(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = auth()->user();

        $cartItem = $user->cart()->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            if ($cartItem->quantity > 1) {
                // Decrease the quantity
                $cartItem->decrement('quantity');
            } else {
                // Remove the item if quantity is 1
                $cartItem->delete();
            }

            return response()->json([
                'message' => 'Quantity updated successfully.',
                'cart_item' => $cartItem->exists ? $cartItem : null,
            ]);
        } else {
            return response()->json([
                'message' => 'Product not found in the cart.',
            ], 404);
        }
    }



    // Remove a product from cart
    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = auth()->user();

        $deleted = $user->cart()->where('product_id', $request->product_id)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Product removed from cart.']);
        }

        return response()->json(['message' => 'Product not found in cart.'], 404);
    }

    // View cart
    public function viewCart()
    {
        $user = auth()->user();

        $cartItems = $user->cart()->with('product.images')->get();

        return response()->json(['cart' => $cartItems]);
    }

    public function getCartTotal(Request $request)
    {
        $user = auth()->user();

        $cartItems = $user->cart()->with('product')->get();

        $total = $cartItems->reduce(function ($sum, $cartItem) {
            return $sum + ($cartItem->quantity * $cartItem->product->price);
        }, 0);

        return response()->json([
            'message' => 'Cart total retrieved successfully.',
            'total' => $total,
        ]);
    }


    // Checkout (clear the cart and reduce stock)
    public function checkout()
    {
        $user = auth()->user();

        // Get the user's cart items
        $cartItems = $user->cart()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty.'], 400);
        }

        $total = 0;

        // Calculate the total and validate stock
        foreach ($cartItems as $cartItem) {
            $product = $cartItem->product;

            if ($product->stock_quantity < $cartItem->quantity) {
                return response()->json([
                    'message' => "Insufficient stock for product: {$product->name}.",
                ], 400);
            }

            $total += $cartItem->quantity * $product->price;
        }

        try {
            // Begin transaction
            \DB::beginTransaction();

            // Create the order
            $order = Order::create([
                'user_id' => $user->id,
                'order_date' => now(),
                'status_id' => 1, // Pending status
                'total' => $total,
            ]);

            // Create order items and reduce product stock
            foreach ($cartItems as $cartItem) {
                $product = $cartItem->product;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $cartItem->quantity,
                    'price' => $product->price,
                ]);

                // Reduce stock
                $product->stock_quantity -= $cartItem->quantity;
                $product->save();
            }

            // Clear user's cart
            $user->cart()->delete();

            // Commit transaction
            \DB::commit();

            return response()->json([
                'message' => 'Checkout completed and order created successfully.',
                'order' => $order->load('orderItems.product', 'status'),
            ]);
        } catch (\Exception $e) {
            // Rollback transaction on failure
            \DB::rollBack();

            return response()->json([
                'message' => 'An error occurred during checkout.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
