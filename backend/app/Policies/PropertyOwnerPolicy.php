<?php

namespace App\Policies;

use App\Models\User;

class PropertyOwnerPolicy
{
    /**
     * Determine whether the user has property-owner privileges.
     */
    public function access(User $user): bool
    {
        return $user->role === 'property_owner';
    }
}