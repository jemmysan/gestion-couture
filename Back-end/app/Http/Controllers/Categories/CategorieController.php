<?php

namespace App\Http\Controllers\Categories;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Categories\Categorie;
use Illuminate\Database\QueryException;
use App\Http\Controllers\Messages\ResponseMessage;
use App\Http\Resources\Resources\Categories\CategorieResource;
use App\Http\Resources\Collections\Categories\CategorieCollection;

class CategorieController extends Controller
{
    public function index($nbrPage)
    {
        $categorie = Categorie::paginate($nbrPage);
        return new CategorieCollection($categorie);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'libelle'=> 'required|min:2|regex:/^[a-zA-Z-]+$/'
        ]);
    
        $message = new ResponseMessage;

        $existCat = Categorie::where('libelle',$validate['libelle'])->first();
        if(!$existCat){
           $categorie = categorie::create([
                'libelle'=>$validate['libelle']
           ]);
           return $message->succedRequest($categorie,'categorie ajouter avec succès!');
        }
        else{
            return $message->errorRequest('categorie existe déjà!',422);
        }
    }

    public function getCategorieById($idCategorie)
    {
        return new CategorieResource(Categorie::find($idCategorie));
    }

}
