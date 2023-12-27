<?php

namespace App\Models\Categories;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Categorie extends Model
{
    use HasFactory;
    use softDeletes;


    protected $fillable = ['libelle'];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}
