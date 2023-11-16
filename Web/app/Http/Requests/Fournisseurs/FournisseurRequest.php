<?php

namespace App\Http\Requests\Fournisseurs;

use Illuminate\Foundation\Http\FormRequest;

class FournisseurRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'last_name'=>'required|string',
            'first_name'=>'required|string',
            'telephone'=>'required|numeric|regex:/^[0-9]{9}$/',
            'addresse'=>'required'
        ];
    }
}
