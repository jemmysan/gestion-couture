<?php

namespace App\Models\Associations;

use App\Models\Articles\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class ArticleFournisseur extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function articles()
    {
        return $this->belongsTo(Article::class);
    }

    // public function fournisseurs()
    // {
    //     return $this->belongsToMany(Fournisseur::class,'');
    // }
}
