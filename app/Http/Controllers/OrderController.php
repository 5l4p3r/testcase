<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return DB::table('orders')
        ->join('customers','customers.code','=','orders.code_customer')
        ->join('items','items.code','=','orders.code_item')
        ->select(DB::raw('
            orders.id,
            orders.date,
            customers.code as codecustomer,
            customers.name as customername,
            items.code as itemcode,
            items.name as itemname,
            orders.qty,
            orders.price,
            orders.discount,
            customers.city
        '))
        ->get();
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

    public function put(Request $request)
    {
        return Order::where('id',$request->id)->update([
            'qty' => $request->qty,
            'price' => $request->price,
            'discount' => $request->discount,
            'total' => ($request->qty * $request->price) - $request->discount,
        ]);
    }
}
