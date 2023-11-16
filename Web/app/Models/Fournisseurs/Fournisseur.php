<?php

namespace App\Models\Fournisseurs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;

    protected $fillable = [
        'last_name',
        'first_name',
        'telephone',
        'addresse',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

   
}
