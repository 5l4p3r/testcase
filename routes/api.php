<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customer',[CustomerController::class,'index']);
Route::post('/customer',[CustomerController::class,'post']);
Route::put('/customer',[CustomerController::class,'put']);
Route::delete('/customer/{id}',[CustomerController::class,'delete']);

Route::get('/item',[ItemController::class,'index']);
Route::post('/item',[ItemController::class,'post']);
Route::put('/item',[ItemController::class,'put']);
Route::delete('/item/{id}',[ItemController::class,'delete']);
