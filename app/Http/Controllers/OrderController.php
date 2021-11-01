<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class OrderController extends Controller
{
    public function index()
    {
        return Order::all();
    }

    public function post(Request $request)
    {
        return Order::create([
            'code_customer' => $request->code_customer,
            'order' => $request->order,
            'date' => Carbon::parse($request->date)->translatedFormat('l, d F Y'),
            'code_item' => $request->code_item,
            'city' => $request->city,
            'qty' => $request->qty,
            'discount' => $request->discount,
            'price' => $request->price,
            'total' => ($request->qty * $request->price) - $request->discount,
        ]);
    }
}
