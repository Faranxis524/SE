<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\DonationController;

Route::get('/', function () {
    return view('welcome');
});

