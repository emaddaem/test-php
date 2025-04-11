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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->enum('gender', ['Mme', 'M']);
            $table->string('last_name');
            $table->string('first_name');
            $table->string('email');
            $table->string('phone');
            $table->enum('message_type', [
                'Demande de visite',
                'Être rappelé',
                'Plus de photos'
            ]);
            $table->text('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
