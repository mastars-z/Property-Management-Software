<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function update(Request $request, User $user)
    {
        $currentUser = $request->user();

        // Tenant data-isolation check: Tenants can only modify their own profile[cite: 1, 4]
        if ($currentUser->role === 'tenant' && $currentUser->id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden',
                'errors' => ['access' => ['You can only update your own profile.']],
                'data' => null
            ], 403);
        }

        // Role update restriction: Only administrators can change roles[cite: 2, 4]
        if ($request->has('role') && $currentUser->role !== 'administrator') {
             return response()->json([
                'success' => false,
                'message' => 'Forbidden',
                'errors' => ['role' => ['You do not have permission to change your system role.']],
                'data' => null
            ], 403);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'phone' => ['sometimes', 'string', 'max:20', 'nullable'],
            'password' => ['sometimes', 'string', 'min:8', 'confirmed'],
            'role' => ['sometimes', 'string', Rule::in(['administrator', 'property_owner', 'property_manager', 'tenant'])],
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']); // Passwords must be hashed
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ], 200);
    }
}