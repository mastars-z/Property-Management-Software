<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = [
        'property_id',
        'unit_number',
        'floor',
        'type',
        'monthly_rent',
        'currency',
        'status',
    ];

    protected $casts = [
        'monthly_rent' => 'decimal:2',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
