<?php

namespace App\Policies;

use App\Models\Property;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PropertyPolicy
{
    
    public function viewAny(User $user): bool
    {
        return in_array($user -> role, ['administrator', 'property_owner', 'property_manager']);
    }

    
    public function view(User $user, Property $property): bool
    {
        return $this -> hasScope($user, $property);
    }

    
    public function create(User $user): bool
    {
        return in_array($user -> role, ['administrator', 'property_owner']);
    }

    
    public function update(User $user, Property $property): bool
    {
        return $this -> hasScope($user, $property);
    }

    
    public function delete(User $user, Property $property): bool
    {
        return $this -> hasScope($user, $property);
    }

    private function hasScope(User $user, Property $property):bool
    {
        if ($user -> role === 'administrator'){
            return true;
        }
        if ($user -> role === 'property_owner'){
            return $property -> owner_id === $user -> id;
        }
        if ($user -> role === 'property_manager'){
            return $property -> activeManagerAssignments() -> where('manager_id', $user_id) -> exists();
        }
        return false;
    }
    
    public function restore(User $user, Property $property): bool
    {
        return false;
    }

    
    public function forceDelete(User $user, Property $property): bool
    {
        return false;
    }
}
