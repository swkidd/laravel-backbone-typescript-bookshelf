<?php

Route::group(['prefix' => 'auth'], function () {
    Auth::routes();
});

// all non-auth routes matching ^[A-z0-9\-_]+$ to HomeController
// routing is handled by Backbone.js on the client
Route::get('/{route?}', 'HomeController@index')
    ->where(['route' => '^[A-Za-z0-9\-_]+$'])
    ->name('home');
