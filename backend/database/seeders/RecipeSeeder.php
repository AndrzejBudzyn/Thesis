<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $recipes = [
            [
                'name' => 'Placki ziemniaczane',
                'photo' => file_get_contents(public_path('recipes/plackiZiemniaczane.png')),
                'ingredients' => json_encode([
                    ["title" => "Główne składniki", "items" => [
                        "Ziemniaki - 500g",
                        "Cebula - 1 sztuka",
                        "Mąka pszenna - 2 łyżki",
                        "Jajko - 1 sztuka",
                        "Olej do smażenia - dowolna ilość",
                        "Sól - do smaku",
                        "Pieprz - do smaku",
                    ]]
                ]),
                'preparation' => json_encode([
                    ["title" => "Etapy przygotowania", "items" => [
                        "Obierz ziemniaki i zetrzyj na tarce o drobnych oczkach.",
                        "Obierz cebulę i zetrzyj ją na tarce.",
                        "W misce wymieszaj starte ziemniaki, cebulę, jajko, mąkę, sól i pieprz.",
                        "Na patelni rozgrzej olej, a następnie smaż placki z obu stron na złoty kolor.",
                        "Podawaj z ulubionymi dodatkami, np. śmietaną czy sosem."
                    ]]
                ]),
                'calories' => 250,
                'type' => 'Danie główne',
                'kitchen' => 'Polska',
                'foodPreferences' => 'Classic',
                'weeklyRecipeCount' => 5,
                'isApproved' => true,
                'sumOfIngredients' => 7, // Liczba składników
            ],
            [
                'name' => 'Sorbet malinowy',
                'photo' => file_get_contents(public_path('recipes/sorbetMalinowy.png')),
                'ingredients' => json_encode([
                    ["title" => "Składniki", "items" => [
                        "Maliny - 500g",
                        "Cukier - 100g",
                        "Woda - 100ml",
                        "Sok z cytryny - 1 łyżka",
                    ]]
                ]),
                'preparation' => json_encode([
                    ["title" => "Przygotowanie", "items" => [
                        "W garnku zagotuj wodę z cukrem, aż cukier całkowicie się rozpuści.",
                        "Pozostaw syrop do ostygnięcia.",
                        "Zblenduj maliny na gładką masę i przetrzyj je przez sitko, aby pozbyć się pestek.",
                        "Wymieszaj masę malinową z syropem cukrowym i sokiem z cytryny.",
                        "Przelej mieszankę do pojemnika i umieść w zamrażarce.",
                        "Mieszaj co godzinę, aby zapobiec tworzeniu się kryształków lodu."
                    ]]
                ]),
                'calories' => 120,
                'type' => 'Deser',
                'kitchen' => 'Międzynarodowa',
                'foodPreferences' => 'Vegan',
                'weeklyRecipeCount' => 3,
                'isApproved' => true,
                'sumOfIngredients' => 4, // Liczba składników
            ],
            [
                'name' => 'Zupa ogórkowa',
                'photo' => file_get_contents(public_path('recipes/zupaOgórkowa.png')),
                'ingredients' => json_encode([
                    ["title" => "Składniki", "items" => [
                        "Ogórki kiszone - 300g",
                        "Bulion warzywny - 1.5l",
                        "Ziemniaki - 500g",
                        "Marchew - 2 sztuki",
                        "Pietruszka (korzeń) - 1 sztuka",
                        "Śmietana - 150ml",
                        "Liść laurowy - 2 sztuki",
                        "Ziele angielskie - 3 sztuki",
                        "Sól - do smaku",
                        "Pieprz - do smaku",
                        "Koperek - do dekoracji",
                    ]]
                ]),
                'preparation' => json_encode([
                    ["title" => "Przygotowanie", "items" => [
                        "Obierz ziemniaki, marchew i pietruszkę, a następnie pokrój ziemniaki w kostkę, a marchew i pietruszkę w paski lub zetrzyj na tarce.",
                        "W garnku zagotuj bulion warzywny, dodaj ziemniaki, marchew, pietruszkę, liść laurowy i ziele angielskie. Gotuj przez około 15 minut.",
                        "Ogórki kiszone zetrzyj na tarce o grubych oczkach. Dodaj do zupy razem z sokiem z ogórków po 15 minutach gotowania.",
                        "Gotuj jeszcze przez 10-15 minut, aż wszystkie warzywa będą miękkie.",
                        "Zabiel zupę śmietaną, dokładnie mieszając, aby się nie zwarzyła.",
                        "Dopraw zupę solą i pieprzem do smaku. Przed podaniem udekoruj koperkiem."
                    ]]
                ]),
                'calories' => 80,
                'type' => 'Zupa',
                'kitchen' => 'Polska',
                'foodPreferences' => 'Classic',
                'weeklyRecipeCount' => 4,
                'isApproved' => true,
                'sumOfIngredients' => 11, // Liczba składników
            ]
        ];

        DB::table('recipes')->insert($recipes);
    }
}
