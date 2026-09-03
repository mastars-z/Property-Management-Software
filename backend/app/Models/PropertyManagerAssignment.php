<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyManagerAssignment extends Model
{
    protected $fillable = [
        'property_id',
        'manager_id',
        'status',
        'assigned_at',
        'unassigned_at',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'unassigned_at' => 'datetime',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
