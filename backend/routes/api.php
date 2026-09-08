<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('properties', PropertyController::class);
    Route::apiResource('properties.units', UnitController::class)->shallow();
    Route::apiResource('tenants', TenantController::class);

    // Administrator
    Route::middleware('role:administrator')->group(function () {
        Route::get('/admin-test', function () {
            return response()->json([
                'message' => 'Welcome Administrator!'
            ]);
        });
    });

    // Property Owner
    Route::middleware('role:property_owner')->group(function () {
        Route::get('/owner-test', function () {
            return response()->json([
                'message' => 'Welcome Property Owner!'
            ]);
        });
    });

    // Property Manager
    Route::middleware('role:property_manager')->group(function () {
        Route::get('/manager-test', function () {
            return response()->json([
                'message' => 'Welcome Property Manager!'
            ]);
        });
    });

    // Tenant
    Route::middleware('role:tenant')->group(function () {
        Route::get('/tenant-test', function () {
            return response()->json([
                'message' => 'Welcome Tenant!'
            ]);
        });
    });
});