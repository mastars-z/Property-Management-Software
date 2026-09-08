<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUnitRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $property = $this->route('property');
        return[
            'unit_number' => ['required', 'string', 'max:50', Rule::unique('units', 'unit_number')->where ('property_id', $property->id),],
            'floor' => ['required', 'integer', 'min:0'],
            'type' => ['required', 'in:studio,one_bedroom,two_bedroom,three_bedroom,other'],
            'monthly_rent' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'status' => ['nullable', 'in:vacant,occupied'],
        ];
    }
}
