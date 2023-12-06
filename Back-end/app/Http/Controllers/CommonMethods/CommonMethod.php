<?php

namespace App\Http\Controllers\CommonMethods;

use Illuminate\Http\Request;
use App\Models\Articles\Article;
use App\Http\Controllers\Controller;
use App\Models\Categories\Categorie;
use App\Http\Controllers\Messages\ResponseMessage;

class CommonMethod extends Controller
{
    public function insertOrderNum($model,$idCategorie)
    {
        $message = new ResponseMessage();
        if($model === 'Article'){
            $count = count(Article::where('categorie_id',$idCategorie)->get())+1;
            return $message->generateRefOrderNum($count);
        }
    }

    public function createReference($libelle,$categorie)
    {
        $lib = substr($libelle,0,3);
        $getCat = Categorie::find($categorie);
        $libelleCat = $getCat->libelle;
        $checkDash = strstr($libelleCat,'-')?true:false;
        $cat = '';

        if($checkDash){
            $explodeCat = explode('-',$libelleCat);
            $cat = substr($explodeCat[0],0,1).substr($explodeCat[1],0,2);
        }else{
            $cat = substr($libelleCat,0,3);
        }
        
        $x = $this->insertOrderNum('Article',$getCat->id);
        $refJoined = "ref".$lib.$cat.$x;
        $segment = str_split($refJoined,3);
        $implode = implode('-',$segment);
        $reference = strtoupper($implode);
        return $reference = strtoupper($implode); 
    }
}
