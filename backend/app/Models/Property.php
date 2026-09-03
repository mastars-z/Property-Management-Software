<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'owner_id',
        'name',
        'address',
        'description',
        'status',
    ];
    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }
    public function managerAssignments()
    {
        return $this->hasMany(PropertyManagerAssignment::class);
    }
    public function activeManagerAssignments()
    {
        return $this->managerAssignments()->where('status', 'active');
    }
    public function units()
    {
        return $this->hasMany(Unit::class);
    }

}
