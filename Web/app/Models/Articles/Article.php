<?php

namespace App\Models\Articles;

use Illuminate\Database\Eloquent\Model;
use App\Models\Associations\ArticleFournisseur;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function fournisseurs()
    {
        return $this->belongsToMany(ArticleFournisseur::class,'article_fournisseur','article_id','fournisseur_id');
    }
}
