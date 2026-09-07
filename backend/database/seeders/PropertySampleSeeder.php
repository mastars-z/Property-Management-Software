<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\PropertyManagerAssignment;
use App\Models\Tenant;
use App\Models\Unit;
use App\Models\User;

class PropertySampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $owner = User::firstOrCreate(
            ['email' => 'owner1@example.test'], 
            [
                'name' => 'Abebe Kebede',
                'password' => 'password',
                'role' => 'property_owner',
                'status' => 'active',
            ]
        );
        $manager = User::firstOrCreate(
            ['email' => 'manager1@example.test'],
            [
                'name' => 'Marta Alemu',
                'password' => 'password',
                'role' => 'property_manager',
                'status' => 'active',
            ]
        );
        $property = Property::create([
            'owner_id' => $owner->id,
            'name' => 'Green Valley Apartments',
            'address' => 'Bole, Addis Ababa',
            'description' => 'Sample seeded property for development.',
            'status' => 'active',
        ]);
        PropertyManagerAssignment::create([
            'property_id' => $property->id,
            'manager_id' => $manager->id,
            'status' => 'active',
            'assigned_at' => now(),
        ]);
        Unit::create([
            'property_id' => $property->id,
            'unit_number' => 'A101',
            'floor' => 1,
            'type' => 'two_bedroom',
            'monthly_rent' => 18400.00,
            'currency' => 'ETB',
            'status' => 'vacant',
        ]);
        Tenant::create([
            'name' => 'Sample Tenant',
            'email' => 'tenant1@example.test',
            'phone' => '+251911223344',
            'status' => 'active',
        ]);
    }
}
