<?php

namespace App\Policies;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TenantPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['administrator', 'property_owner', 'property_manager']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Tenant $tenant): bool
    {
        if (in_array($user->role, ['administrator', 'property_owner', 'property_manager'])){
            return true;
        }
        return $user->role === 'tenant' && $tenant->user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['administrator', 'property_owner', 'property_manager']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Tenant $tenant): bool
    {
        return in_array($user->role, ['administrator', 'property_owner', 'property_manager']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Tenant $tenant): bool
    {
        return in_array($user->role, ['administrator', 'property_owner', 'property_manager']);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Tenant $tenant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Tenant $tenant): bool
    {
        return false;
    }
    /**
     * Determine whether the user has tenant privileges.
     */
    public function access(User $user): bool
    {
        return $user->role === 'tenant';
    }
}
     

