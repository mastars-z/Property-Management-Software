<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties');
            $table->string('unit_number',50);
            $table->unsignedInteger('floor');
            $table->enum('type', ['studio', 'one_bedroom', 'two_bedroom', 'three_bedroom', 'other']);
            $table->decimal('monthly_rent', 10, 2);
            $table->char('currency', 3)->default('ETB');
            $table->enum('status', ['vacant', 'occupied'])->default('vacant');
            $table->timestamps();
            $table->unique(['property_id', 'unit_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
