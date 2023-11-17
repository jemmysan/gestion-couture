<?php

namespace App\Http\Resources\Resources\Articles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'libelle'=>$this->libelle,
            'price'=>$this->prix,
            'stock'=>$this->stock,
            'categorie_id'=>$this->categorie_id,
            'photo'=>$this->photo,
            'reference'=>$this->reference
        ];
    }
}
