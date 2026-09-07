<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index (Request $request)
    {
        $this -> authorize ('viewAny', Property::class);
        $user = $request->user();
        $query = Property::with(['owner', 'activeManagerAssignments.manager']) ->withCount('units');
        if ($user->role === 'property_owner') {
            $query->where('owner_id', $user->id);
        } elseif ($user->role === 'property_manager') {
            $query->whereHas('activeManagerAssignments', function ($q) use ($user) {
                $q->where('manager_id', $user->id);
            });
        
            }
        $properties = $query->paginate(15);
        return response()->json([
                'success' => true,
                'message' => 'Properties retrieved successfully',
                'data' => $properties->items(),
                'meta' => [
                    'current_page' => $properties->currentPage(),
                    'per_page' => $properties->perPage(),
                    'total' => $properties->total(),
                ],
            ]);
    }
    public function store(StorePropertyRequest $request)
    {
        $this->authorize('create', Property::class);

        $ownerId = $request->user()->role === 'administrator' ? $request->validated('owner_id') : $request->user()->id;

        $property = Property::create([
            'owner_id' => $ownerId,
            'name' => $request->validated('name'),
            'address' => $request->validated('address'),
            'description' => $request->validated('description'),
            'status' => $request->validated('status') ?? 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Property created successfully',
            'data' => $property->load('owner'),
        ], 201);
    }

    public function show(Property $property)
    {
        $this->authorize('view', $property);

        return response()->json([
            'success' => true,
            'message' => 'Property retrieved successfully',
            'data' => $property->load(['owner', 'activeManagerAssignments.manager', 'units']) ->loadCount('units'),
        ]);
    }

    public function update(UpdatePropertyRequest $request, Property $property)
    {
        $this->authorize('update', $property);

        $property->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Property updated successfully',
            'data' => $property->fresh('owner'),
        ]);
    }

    public function destroy(Property $property)
    {
        $this->authorize('delete', $property);

        $property->update(['status' => 'archived']);
        $property->delete();

        return response()->json([
            'success' => true,
            'message' => 'Property archived successfully',
            'data' => null,
        ]);
    }
}
