<?php

namespace App\Policies;

use App\Models\User;

class AdministratorPolicy
{
    /**
     * Determine whether the user has administrator privileges.
     */
    public function access(User $user): bool
    {
        return $user->role === 'administrator';
    }
}