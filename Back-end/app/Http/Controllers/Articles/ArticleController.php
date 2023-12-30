<?php

namespace App\Http\Controllers\Articles;

use Illuminate\Http\Request;
use App\Models\Articles\Article;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Categories\Categorie;
use App\Http\Requests\Articles\ArticleRequest;
use App\Models\Associations\ArticleFournisseur;
use App\Http\Controllers\Messages\ResponseMessage;
use App\Http\Controllers\CommonMethods\CommonMethod;
use App\Http\Resources\Collections\Articles\ArticleCollection;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return new ArticleCollection($articles);
    }
   
    public function store(ArticleRequest $request)
    {
        $libelle = $request->libelle;
        $price = $request->price;
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
                $imageContents = file_get_contents($request->photo->path());
                $base64Image = base64_encode($imageContents);
                $article = Article::create([
                    'libelle'=>$request->libelle,
                    'price'=>$request->price,
                    'stock'=>$request->stock,
                    'categorie_id'=>$request->categorie,
                    'reference'=>$reference,
                    'photo'=>$base64Image
                ]);
                $article->fournisseurs()->attach($request->fournisseurs);
                return $message->succedRequestWithData($article,'Article ajouté avec succès!');
            });
        }else{
            return DB::transaction(function () use($request, $existArticle,$message){
                $existArticle->update(['price'=>($existArticle->price+$request->price)]);
                $existArticle->update(['stock'=>($existArticle->stock+$request->stock)]);
                $existArticle->fournisseurs()->attach($request->fournisseurs);
                return $message->succedRequestWithData($existArticle,'Article ajouté avec succès!');
            });
        }  
    }


    public function update(Request $request,$idArticle)
    {
        $article = Article::where('id',$idArticle)->first();
        $method = new CommonMethod();
        $article->update([
            'libelle'=>$request->libelle,
            'price'=>$request->price,
            'stock'=>$request->stock,
            'categorie_id'=>$request->categorie,
            'reference'=>$method->createReference($request->libelle,$request->categorie)
        ]);
        return response()->json(['message'=>'Modification effectuée avec success!']);    
    }


    public function delete($idArticle)
    {
        return DB::transaction(function () use($idArticle){
            $article = Article::find($idArticle);
            if($article)
            {
                // $article->fournisseurs()->update(['deleted_at' => now()]);
                $association = ArticleFournisseur::where('article_id',$idArticle)->get();
                foreach ($association as $items) {
                    $items->update(['deleted_at' => now()]);
                }
                $article->delete();
                return response()->json(['messages'=>'article supprimé avec succès']);
            }
            else
            {
                return response()->json(['messages'=>'article introuvable']);
            }
        });
    }

    public function restore($id)
    {
        return $association = ArticleFournisseur::where('article_id',$id)->get();

        $article = Article::where('id',$id)->restore();
        return response()->json(["messages"=>"restore successfully"]);
    }
}
