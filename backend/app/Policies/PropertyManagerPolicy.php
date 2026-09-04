<?php

namespace App\Policies;

use App\Models\User;

class PropertyManagerPolicy
{
    /**
     * Determine whether the user has property-manager privileges.
     */
    public function access(User $user): bool
    {
        return $user->role === 'property_manager';
    }
}