<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Articles\ArticleController;
use App\Http\Controllers\Categories\CategorieController;
use App\Http\Controllers\Fournisseurs\FournisseurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('fournisseur')->group(function (){
    Route::post('/store',[FournisseurController::class,'store']);
    Route::post('/find',[FournisseurController::class,'findFournisseur']);
});

Route::prefix('categorie')->group(function (){
    Route::post('/store',[CategorieController::class,'store']);
    Route::get('/find/{id}',[CategorieController::class,'getCategorieById']);
});


Route::prefix('article')->group(function (){
    Route::post('/store',[ArticleController::class,'store']);
    Route::put('/update/{id}',[ArticleController::class,'update']);
    Route::get('/list/{id}',[ArticleController::class,'index']);
});



