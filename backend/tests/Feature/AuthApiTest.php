<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_as_tenant()
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'user' => ['id', 'name', 'email', 'role', 'status'],
                         'token'
                     ]
                 ]);

        $this->assertDatabaseHas('users', ['email' => 'john@example.com', 'role' => 'tenant']);
    }

    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'jane@example.com',
            'password' => bcrypt('password123'),
            'status' => 'active'
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'jane@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'user',
                         'token'
                     ]
                 ]);
    }

    public function test_admin_route_blocks_unauthorized_roles()
    {
        $tenant = User::factory()->create(['role' => 'tenant', 'status' => 'active']);

        $response = $this->actingAs($tenant, 'sanctum')
                         ->getJson('/api/v1/admin-test');

        // Should return a 403 Forbidden response per RBAC middleware rules
        $response->assertStatus(403)
                 ->assertJson([
                     'success' => false,
                     'message' => 'Forbidden'
                 ]);
    }

    public function test_admin_route_allows_administrator()
    {
        $admin = User::factory()->create(['role' => 'administrator', 'status' => 'active']);

        $response = $this->actingAs($admin, 'sanctum')
                         ->getJson('/api/v1/admin-test');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Welcome Administrator!'
                 ]);
    }
}