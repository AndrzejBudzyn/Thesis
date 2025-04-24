<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RecipeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Recipe::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
           'name' => $this->faker->sentence(3),
            'photo' => $this->faker->imageUrl(640, 480, 'food'),
            'ingredients' => json_encode([
         ['title' => $this->faker->word(), 'items' => [$this->faker->word(), $this->faker->word()]]
            ]),
            'preparation' => json_encode([
        ['title' => $this->faker->word(), 'items' => [$this->faker->sentence(), $this->faker->sentence()]]
            ]),
            'sumOfIngredients' => $this->faker->randomNumber(2),
            'calories' => $this->faker->numberBetween(0, 5000),
            'type' => $this->faker->word(),
            'kitchen' => $this->faker->optional()->word(),
            'foodPreferences' => $this->faker->numberBetween(1, 5),
            'weeklyRecipeCount' => $this->faker->randomNumber(2),
            'isApproved' => $this->faker->boolean(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
