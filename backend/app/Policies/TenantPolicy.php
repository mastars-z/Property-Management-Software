<?php

namespace App\Policies;

use App\Models\User;

class TenantPolicy
{
    /**
     * Determine whether the user has tenant privileges.
     */
    public function access(User $user): bool
    {
        return $user->role === 'tenant';
    }
}