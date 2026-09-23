<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;

class RbacPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_middleware_allows_authorized_role()
    {
        $admin = User::factory()->create(['role' => 'administrator']);
        
        $request = Request::create('/api/v1/dummy', 'GET');
        $request->setUserResolver(fn() => $admin);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, function () {
            return response('OK');
        }, 'administrator');

        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_middleware_rejects_unauthorized_role_with_403()
    {
        $tenant = User::factory()->create(['role' => 'tenant']);
        
        $request = Request::create('/api/v1/dummy', 'GET');
        $request->setUserResolver(fn() => $tenant);

        $middleware = new CheckRole();
        $response = $middleware->handle($request, function () {}, 'administrator', 'property_owner');

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertFalse(json_decode($response->getContent())->success);
    }
}