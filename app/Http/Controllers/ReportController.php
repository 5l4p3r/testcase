<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function qty()
    {
        return DB::table('orders')
        ->groupBy('orders.date','orders.order','code_customer')
        ->join('customers','customers.code','=','orders.code_customer')
        ->select(DB::raw('orders.date, orders.code_customer,customers.name, sum(qty) as qty, sum(qty * price) as subtotal, sum(discount) as discount, sum(qty * price - discount) as total'))
        ->get();
    }
    public function date()
    {
        return DB::table('orders')
        ->groupBy('code_customer', 'date')
        ->join('customers', 'customers.code','=', 'orders.code_customer')
        ->select(DB::raw("code, name, sum(qty) as qty, date, sum(qty * price - discount) as total"))
        ->orderBy('qty')
        ->get();
    }
    public function item()
    {
        return DB::table('orders')
        ->groupBy('orders.code_item','items.code')
        ->join('items','items.code','=','orders.code_item')
        ->select(DB::raw('orders.code_item, items.name, sum(qty) as qty, avg(price) as avg, sum(qty * price ) as total'))
        ->get();
    }
}
