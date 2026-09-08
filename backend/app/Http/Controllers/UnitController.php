<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Property;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request, Property $property)  
    {
        $this->authorize('view', $property);
        $units = $property->units()->paginate(15);
        return response()->json([
            'success' => true,
            'message' => 'Units retrived successfully',
            'data' => $units->items(),
            'meta' => [
                'current_page' => $units->currentPage(),
                'per_page' => $units->perPage(),
                'total' => $units->total(),
            ],
        ]);
    }
    public function store(StoreUnitRequest $request, Property $property)
    {
       $this->authorize('create', [Unit::class, $property]);
       $unit = Unit::create([
        'property_id' => $property->id,
        'unit_number' => $request->validated('unit_number'),
        'floor' => $request->validated('floor'),
        'type' => $request->validated('type'),
        'monthly_rent' => $request->validated('monthly_rent'),
        'currency' =>$request->validated('currency') ?? 'ETB',
        'status' => $request->validated('status') ?? 'vacant',
       ]);
       return response()->json([
        'success' => true,
        'message' => 'Unit created successfully',
        'data' => $unit,
       ], 201);
    }
    public function show(Unit $unit)
    {
        $this->authorize('view', $unit);

        return response()->json([
            'success' => true,
            'message' => 'Unit retrieved successfully',
            'data' => $unit->load('property'),
        ]);
    }
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $this->authorize('update', $unit);

        $unit->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Unit updated successfully',
            'data' => $unit->fresh(),
        ]);
    }
    public function destroy(Unit $unit)
    {
        $this->authorize('delete', $unit);

        $unit->delete();

        return response()->json([
            'success' => true,
            'message' => 'Unit deleted successfully',
            'data' => null,
        ]);
    }
}
