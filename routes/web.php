<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/me',[UserController::class, 'profile']);

Route::group(['middleware' => ['admin']],function(){
    Route::get('/customer', function(){
        return view('admin');
    })->where('path','/customer');
    Route::get('/item',function(){
        return view('admin');
    })->where('path','/item');
    Route::get('/order',function(){
        return view('admin');
    })->where('path','/order');
    Route::get('/summary/qty',function(){
        return view('admin');
    })->where('path','/summary/qty');
    Route::get('/summary/date',function(){
        return view('admin');
    })->where('path','/summary/date');
    Route::get('/summary/item',function(){
        return view('admin');
    })->where('path','/summary/item');
});