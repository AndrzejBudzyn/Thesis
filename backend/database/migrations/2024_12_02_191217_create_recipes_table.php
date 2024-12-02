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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->binary('photo')->nullable();
            $table->json('ingredients');
            $table->json('preparation');
            $table->json('sumOfIngredients');
            $table->integer('calories');
            $table->string('type');
            $table->string('kitchen')->nullable();
            $table->enum('foodPreferences', ["Classic", "Vegetarian", "Vegan", "Semi-Vegetarian"]); 
            $table->integer('weeklyRecipeCount')->nullable();
            $table->boolean("isApproved");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
