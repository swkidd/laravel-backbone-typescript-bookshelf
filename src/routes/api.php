<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\BookController;

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


Route::group(
    [
        'prefix' => 'v1',
        // uses session based auth for both api and web routes
        'middleware' => ['auth']
    ],
    function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/book/export', 'API\BookController@export')->name('book.export');
        Route::apiResource('/book', 'API\BookController');
    }
);
