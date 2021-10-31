<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::all();
    }
    public function post(Request $request)
    {
        $this->validate($request,[
            'code' => 'required|string|unique:customers'
        ],
        [
            'message' => 'Code already taken'
        ]
    );
        return Customer::create([
            'code' => $request->code,
            'name' => $request->name,
            'city' => $request->city,
        ]);
    }
    public function put(Request $request)
    {
        return Customer::where('code',$request->code)->update([
            'name' => $request->name,
            'city' => $request->city, 
        ]);
    }
    public function delete($id)
    {
        return Customer::where('id',$id)->delete();
    }
}
