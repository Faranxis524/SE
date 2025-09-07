<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\DonationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::apiResource('homes', HomeController::class);
Route::apiResource('abouts', AboutController::class);
Route::apiResource('videos', VideoController::class);
Route::apiResource('blogs', BlogController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('campaigns', CampaignController::class);
Route::apiResource('donations', DonationController::class);