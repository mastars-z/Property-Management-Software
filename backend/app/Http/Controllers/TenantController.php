<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Tenant::class);

        $tenants = Tenant::paginate(15);

        return response()->json([
            'success' => true,
            'message' => 'Tenants retrieved successfully',
            'data' => $tenants->items(),
            'meta' => [
                'current_page' => $tenants->currentPage(),
                'per_page' => $tenants->perPage(),
                'total' => $tenants->total(),
            ],
        ]);
    }

    public function store(StoreTenantRequest $request)
    {
        $this->authorize('create', Tenant::class);

        $tenant = Tenant::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'status' => $request->validated('status') ?? 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tenant created successfully',
            'data' => $tenant,
        ], 201);
    }

    public function show(Tenant $tenant)
    {
        $this->authorize('view', $tenant);

        return response()->json([
            'success' => true,
            'message' => 'Tenant retrieved successfully',
            'data' => $tenant,
        ]);
    }

    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $this->authorize('update', $tenant);

        $tenant->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Tenant updated successfully',
            'data' => $tenant->fresh(),
        ]);
    }

    public function destroy(Tenant $tenant)
    {
        $this->authorize('delete', $tenant);

        $tenant->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tenant deleted successfully',
            'data' => null,
        ]);
    }
}
