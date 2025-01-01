<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    


    // Get user's orders
    public function getUserOrders()
    {
        $user = auth()->user();

        $orders = $user->orders()->with('orderItems.product', 'status')->get();

        return response()->json(['orders' => $orders]);
    }

    // Cancel an order (User only)
    public function cancelOrder($id)
    {
        $user = auth()->user();

        $order = $user->orders()->where('id', $id)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        if ($order->status_id != 1) { 
            return response()->json(['message' => 'Order cannot be canceled.'], 400);
        }

        $order->update(['status_id' => 3]);

        return response()->json(['message' => 'Order canceled successfully.']);
    }

    // Admin: View all orders
    public function getAllOrders()
    {
        $orders = Order::with('orderItems.product', 'user', 'status')->get();

        return response()->json(['orders' => $orders]);
    }

    // Admin: Update order status
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status_id' => 'required|exists:order_status,id',
        ]);

        $order = Order::findOrFail($id);

        $order->update(['status_id' => $request->status_id]);

        return response()->json(['message' => 'Order status updated successfully.', 'order' => $order]);
    }


}
