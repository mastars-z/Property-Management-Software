<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discussion_cases', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('lease_id');

            $table->string('topic');
            $table->text('description');

            $table->enum('status', [
                'open',
                'under_discussion',
                'resolved',
                'closed'
            ])->default('open');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('discussion_cases');
    }
};
