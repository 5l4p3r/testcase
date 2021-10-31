<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return Item::all();
    }
    public function post(Request $request)
    {
        return Item::create([
            'code' => $request->code,
            'name' => $request->name,
        ]);
    }
    public function put(Request $request)
    {
        return Item::where('code',$request->code)->update([
            'name' => $request->name,
        ]);
    }
    public function delete($id)
    {
        return Item::where('id',$id)->delete();
    }
}
