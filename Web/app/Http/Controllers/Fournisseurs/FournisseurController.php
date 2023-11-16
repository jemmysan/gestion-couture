<?php

namespace App\Http\Controllers\Fournisseurs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use App\Models\Fournisseurs\Fournisseur;
use App\Http\Controllers\Messages\ResponseMessage;
use App\Http\Requests\Fournisseurs\FournisseurRequest;

class FournisseurController extends Controller
{
    public function store(FournisseurRequest $request)
    {
        $message = new ResponseMessage;
        try{
                $fournisseur= Fournisseur::create([
                    'last_name'=>$request->last_name,
                    'first_name'=>$request->first_name,
                    'telephone'=>$request->telephone,
                    'addresse'=>$request->addresse
                ]);
            return $message->succedRequest($fournisseur,'fournisseur créé avec succès');
        }
        catch(QueryException $e){
            if($e->getCode() == '23000')
            return $message->errorRequest('fournisseur existe déjà!',422);
        } 
    }

    public function findFournisseur(Request $request)
    {
        $keyWord = $request->validate([
            'keyword'=>'min:2|regex:/^[a-zA-Z]+$/'
        ]);
        return fournisseur::where('first_name','like','%'.$keyWord['keyword'].'%')
                            ->orWhere('last_name','like','%'.$keyWord['keyword'].'%')
                            ->get();
    }
}
