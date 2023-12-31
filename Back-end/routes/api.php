<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Articles\ArticleController;
use App\Http\Controllers\CommonMethods\CommonMethod;
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
    Route::put('/update/{id}',[CategorieController::class,'update']);
    Route::post('/delete',[CategorieController::class,'delete']);
    Route::get('/list',[CategorieController::class,'index']);
    Route::get('/find/{id}',[CategorieController::class,'getCategorieById']);
});


Route::get('numOrder/{model}/{cat}',[CommonMethod::class,'insertOrderNum']);


Route::prefix('article')->group(function (){
    Route::post('/store',[ArticleController::class,'store']);
    Route::delete('/delete/{id}',[ArticleController::class,'delete']);
    Route::get('/restore/{id}',[ArticleController::class,'restore']);
    Route::put('/update/{id}',[ArticleController::class,'update']);
    Route::get('/list',[ArticleController::class,'index']);
});


