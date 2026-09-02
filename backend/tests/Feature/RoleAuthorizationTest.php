<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoleAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrator_can_access_admin_route(): void
    {
        $user = User::factory()->create([
            'role' => 'administrator',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/admin-test');

        $response->assertStatus(200);
    }

    public function test_property_owner_can_access_owner_route(): void
    {
        $user = User::factory()->create([
            'role' => 'property_owner',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/owner-test');

        $response->assertStatus(200);
    }

    public function test_property_manager_can_access_manager_route(): void
    {
        $user = User::factory()->create([
            'role' => 'property_manager',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/manager-test');

        $response->assertStatus(200);
    }

    public function test_tenant_can_access_tenant_route(): void
    {
        $user = User::factory()->create([
            'role' => 'tenant',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/tenant-test');

        $response->assertStatus(200);
    }

    public function test_tenant_cannot_access_admin_route(): void
    {
        $user = User::factory()->create([
            'role' => 'tenant',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/admin-test');

        $response->assertStatus(403);
    }
}