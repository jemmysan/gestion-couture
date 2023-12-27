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
    public $message;

    public function __construct()
    {
        $this->message = new ResponseMessage;
    }

    public function index()
    {
        // $categorie = Categorie::paginate($nbrPage);
        // return new CategorieCollection($categorie);
         return new CategorieCollection(Categorie::all());         
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'libelle'=> 'required|min:2|regex:/^[a-zA-Z-]+$/'
        ]);
    
        $existCat = Categorie::where('libelle',$validate['libelle'])->first();
        if(!$existCat){
           $categorie = categorie::create([
                'libelle'=>$validate['libelle']
           ]);
           return $this->message->succedRequestWithData($categorie,'categorie ajouter avec succès!');
        }
        else{
            return $this->message->failedRequest('categorie existe déjà!',422);
        }
    }

    public function getCategorieById($idCategorie)
    {
        return new CategorieResource(Categorie::find($idCategorie));
    }


    public function update(Request $request, $idCat)
    {
        try{
            Categorie::where('id',$idCat)
                    ->update(['libelle'=>$request->libelle]);
            return $this->message->succedRequest('Categorie modifié avec succès!');
        }
        catch(QueryException $e){
            if($e->getCode() == '23000')
                return $this->message->failedRequest('Categorie Introuvable !',404);
        }   
    }


    public function delete(Request $request)
    {
        $ids = $request->ids;
        if(!empty($ids)){
            try
            {
                Categorie::whereIn('id',$ids)->delete();
                if(count($ids)>1){
                    return $this->message->succedRequest('Categories supprimée avec succès !');
                }
                else{
                    return $this->message->succedRequest('Categorie supprimées avec ');
                }

            }
            catch(QueryException $e)
            {
                if($e->getCode() == '23000')
                    return $this->message->failedRequest('Aucune categorie trouvée',500);
            }
        }
    }

}
