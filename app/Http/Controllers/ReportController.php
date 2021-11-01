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
        ->groupBy('order','code_customer')
        ->join('customers','customers.code','=','orders.code_customer')
        ->selectRaw("date")
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
}
