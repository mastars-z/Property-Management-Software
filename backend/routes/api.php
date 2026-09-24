<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\PropertyController;

Route::prefix('v1')->group(function () {
    
    // Public Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Authenticated User Routes
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        
        // Core Resources
        Route::apiResource('users', UserController::class);
        Route::apiResource('properties', PropertyController::class);

        // Administrator Test
        Route::middleware('role:administrator')->group(function () {
            Route::get('/admin-test', function () {
                return response()->json([
                    'success' => true,
                    'message' => 'Welcome Administrator!',
                    'data' => (object)[]
                ]);
            });
        });

        // Property Owner Test
        Route::middleware('role:property_owner')->group(function () {
            Route::get('/owner-test', function () {
                return response()->json([
                    'success' => true,
                    'message' => 'Welcome Property Owner!',
                    'data' => (object)[]
                ]);
            });
        });

        // Property Manager Test
        Route::middleware('role:property_manager')->group(function () {
            Route::get('/manager-test', function () {
                return response()->json([
                    'success' => true,
                    'message' => 'Welcome Property Manager!',
                    'data' => (object)[]
                ]);
            });
        });

        // Tenant Test
        Route::middleware('role:tenant')->group(function () {
            Route::get('/tenant-test', function () {
                return response()->json([
                    'success' => true,
                    'message' => 'Welcome Tenant!',
                    'data' => (object)[]
                ]);
            });
        });
    });
});