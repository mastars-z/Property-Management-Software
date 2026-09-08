<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitRequest extends FormRequest
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
        $unit = $this->route('unit');
        return [
                'unit_number' => [
                    'sometimes', 'required', 'string', 'max:50',
                Rule::unique('units', 'unit_number')
                    ->where('property_id', $unit->property_id)
                    ->ignore($unit->id),
                ],
                'floor' => ['sometimes', 'required', 'integer', 'min:0'],
                'type' => ['sometimes', 'required', 'in:studio,one_bedroom,two_bedroom,three_bedroom,other'],
                'monthly_rent' => ['sometimes', 'required', 'numeric', 'min:0'],
                'currency' => ['sometimes', 'string', 'size:3'],
                'status' => ['sometimes', 'in:vacant,occupied'],
            ];
    }
}
