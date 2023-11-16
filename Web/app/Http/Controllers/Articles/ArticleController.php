<?php

namespace App\Http\Controllers\Articles;

use Illuminate\Http\Request;
use App\Models\Articles\Article;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Categories\Categorie;
use App\Http\Requests\Articles\ArticleRequest;
use App\Http\Controllers\Messages\ResponseMessage;
use App\Http\Controllers\CommonMethods\CommonMethod;

class ArticleController extends Controller
{
    public function index()
    {
        
    }
   
    public function store(ArticleRequest $request)
    {
        $libelle = $request->libelle;
        $prix = $request->prix;
        $stock = $request->stock;
        $categorie = $request->categorie;
        $fournisseur = $request->fournisseur;
        $photo = $request->photo;

        $method = new CommonMethod();
        $reference = $method->createReference($libelle,$categorie);

        $message = new ResponseMessage();

        $existArticle = Article::where('libelle',$libelle)->first();
        if(!$existArticle){
            return DB::transaction(function () use($request,$reference,$message){
                $article = Article::create([
                    'libelle'=>$request->libelle,
                    'price'=>$request->prix,
                    'stock'=>$request->stock,
                    'categorie_id'=>$request->categorie,
                    'reference'=>$reference,
                    'photo'=>$request->photo
                ]);
                $article->fournisseurs()->attach($request->fournisseurs);
                return $message->succedRequest($article,'Article ajouté avec succès!');
            });
        }else{
            return DB::transaction(function () use($request, $existArticle,$message){
                $existArticle->update(['price'=>($existArticle->price+$request->prix)]);
                $existArticle->update(['stock'=>($existArticle->stock+$request->stock)]);
                $existArticle->fournisseurs()->attach($request->fournisseurs);
                return $message->succedRequest($existArticle,'Article ajouté avec succès!');
            });
        }  
    }


    public function update(Request $request,$idArticle)
    {
        $article = Article::where('id',$idArticle)->first();
        $method = new CommonMethod();
        $article->update([
            'libelle'=>$request->libelle,
            'price'=>$request->prix,
            'stock'=>$request->stock,
            'categorie_id'=>$request->categorie,
            'reference'=>$method->createReference($request->libelle,$request->categorie)
        ]);
        return response()->json(['message'=>'Modification effectuée avec success!']);    
    }
}
