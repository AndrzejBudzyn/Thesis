<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\File;

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
                    ['ingredient' => 'Ziemniaki', 'amount' => '500g'],
                    ['ingredient' => 'Cebula', 'amount' => '1 sztuka'],
                    ['ingredient' => 'Mąka pszenna', 'amount' => '2 łyżki'],
                    ['ingredient' => 'Jajko', 'amount' => '1 sztuka'],
                    ['ingredient' => 'Olej do smażenia', 'amount' => 'dowolna ilość'],
                    ['ingredient' => 'Sól', 'amount' => 'do smaku'],
                    ['ingredient' => 'Pieprz', 'amount' => 'do smaku'],
                ]),
                'preparation' => json_encode([
                    "Obierz ziemniaki i zetrzyj na tarce o drobnych oczkach.",
                    "Obierz cebulę i zetrzyj ją na tarce.",
                    "W misce wymieszaj starte ziemniaki, cebulę, jajko, mąkę, sól i pieprz.",
                    "Na patelni rozgrzej olej, a następnie smaż placki z obu stron na złoty kolor.",
                    "Podawaj z ulubionymi dodatkami, np. śmietaną czy sosem."
                ]),
                'sumOfIngredients' => json_encode([
                    'Ziemniaki' => '500g',
                    'Cebula' => '1 sztuka',
                    'Mąka pszenna' => '2 łyżki',
                    'Jajko' => '1 sztuka',
                    'Olej do smażenia' => 'dowolna ilość',
                    'Sól' => 'do smaku',
                    'Pieprz' => 'do smaku'
                ]),
                'calories' => 250,
                'type' => 'Danie główne',
                'kitchen' => 'Polska',
                'foodPreferences' => 'Classic',
                'weeklyRecipeCount' => 5,
                'isApproved' => true,
            ],
            [
                'name' => 'Sorbet malinowy',
                'photo' => file_get_contents(public_path('recipes/sorbetMalinowy.png')),
                'ingredients' => json_encode([
                    ['ingredient' => 'Maliny', 'amount' => '500g'],
                    ['ingredient' => 'Cukier', 'amount' => '100g'],
                    ['ingredient' => 'Woda', 'amount' => '100ml'],
                    ['ingredient' => 'Sok z cytryny', 'amount' => '1 łyżka'],
                ]),
                'preparation' => json_encode([
                    "W garnku zagotuj wodę z cukrem, aż cukier całkowicie się rozpuści.",
                    "Pozostaw syrop do ostygnięcia.",
                    "Zblenduj maliny na gładką masę i przetrzyj je przez sitko, aby pozbyć się pestek.",
                    "Wymieszaj masę malinową z syropem cukrowym i sokiem z cytryny.",
                    "Przelej mieszankę do pojemnika i umieść w zamrażarce.",
                    "Mieszaj co godzinę, aby zapobiec tworzeniu się kryształków lodu."
                ]),
                'sumOfIngredients' => json_encode([
                    'Maliny' => '500g',
                    'Cukier' => '100g',
                    'Woda' => '100ml',
                    'Sok z cytryny' => '1 łyżka'
                ]),
                'calories' => 120,
                'type' => 'Deser',
                'kitchen' => 'Międzynarodowa',
                'foodPreferences' => 'Vegan',
                'weeklyRecipeCount' => 3,
                'isApproved' => true,
            ],
            [
                'name' => 'Zupa ogórkowa',
                'photo' => file_get_contents(public_path('recipes/zupaOgórkowa.png')),
                'ingredients' => json_encode([
                    ['ingredient' => 'Ogórki kiszone', 'amount' => '300g'],
                    ['ingredient' => 'Bulion warzywny', 'amount' => '1.5l'],
                    ['ingredient' => 'Ziemniaki', 'amount' => '500g'],
                    ['ingredient' => 'Marchew', 'amount' => '2 sztuki'],
                    ['ingredient' => 'Pietruszka (korzeń)', 'amount' => '1 sztuka'],
                    ['ingredient' => 'Śmietana', 'amount' => '150ml'],
                    ['ingredient' => 'Liść laurowy', 'amount' => '2 sztuki'],
                    ['ingredient' => 'Ziele angielskie', 'amount' => '3 sztuki'],
                    ['ingredient' => 'Sól', 'amount' => 'do smaku'],
                    ['ingredient' => 'Pieprz', 'amount' => 'do smaku'],
                    ['ingredient' => 'Koperek', 'amount' => 'do dekoracji'],
                ]),
                'preparation' => json_encode([
                    "Obierz ziemniaki, marchew i pietruszkę, a następnie pokrój ziemniaki w kostkę, a marchew i pietruszkę w paski lub zetrzyj na tarce.",
                    "W garnku zagotuj bulion warzywny, dodaj ziemniaki, marchew, pietruszkę, liść laurowy i ziele angielskie. Gotuj przez około 15 minut.",
                    "Ogórki kiszone zetrzyj na tarce o grubych oczkach. Dodaj do zupy razem z sokiem z ogórków po 15 minutach gotowania.",
                    "Gotuj jeszcze przez 10-15 minut, aż wszystkie warzywa będą miękkie.",
                    "Zabiel zupę śmietaną, dokładnie mieszając, aby się nie zwarzyła.",
                    "Dopraw zupę solą i pieprzem do smaku. Przed podaniem udekoruj koperkiem."
                ]),
                'sumOfIngredients' => json_encode([
                    'Ogórki kiszone' => '300g',
                    'Bulion warzywny' => '1.5l',
                    'Ziemniaki' => '500g',
                    'Marchew' => '2 sztuki',
                    'Pietruszka (korzeń)' => '1 sztuka',
                    'Śmietana' => '150ml',
                    'Liść laurowy' => '2 sztuki',
                    'Ziele angielskie' => '3 sztuki',
                    'Sól' => 'do smaku',
                    'Pieprz' => 'do smaku',
                    'Koperek' => 'do dekoracji'
                ]),
                'calories' => 80,
                'type' => 'Zupa',
                'kitchen' => 'Polska',
                'foodPreferences' => 'Classic',
                'weeklyRecipeCount' => 4,
                'isApproved' => true,
            ],
            [
                'name' => 'Pizza Capriciosa',
                'photo' => file_get_contents(public_path('recipes/Pizza.jpg')),
                'ingredients' => json_encode([
                    ['ingredient' => 'Ciasto na pizzę', 'amount' => '1 sztuka'],
                    ['ingredient' => 'Sos pomidorowy', 'amount' => '100g'],
                    ['ingredient' => 'Mozzarella', 'amount' => '150g'],
                    ['ingredient' => 'Szynka', 'amount' => '100g'],
                    ['ingredient' => 'Pieczarki', 'amount' => '100g'],
                    ['ingredient' => 'Karczochy (marynowane)', 'amount' => '50g'],
                    ['ingredient' => 'Czarne oliwki', 'amount' => '30g'],
                    ['ingredient' => 'Oliwa z oliwek', 'amount' => '1 łyżka'],
                    ['ingredient' => 'Oregano', 'amount' => 'szczypta'],
                ]),
                'preparation' => json_encode([
                    "Przygotuj ciasto na pizzę i rozwałkuj je na okrągły placek.",
                    "Posmaruj ciasto sosem pomidorowym równomiernie po całej powierzchni.",
                    "Posyp startą mozzarellą, pozostawiając trochę miejsca przy brzegach.",
                    "Dodaj pokrojoną szynkę, plasterki pieczarek, kawałki karczochów oraz oliwki.",
                    "Posyp pizzę szczyptą oregano i skrop oliwą z oliwek.",
                    "Piecz pizzę w piekarniku nagrzanym do 220°C przez około 10-12 minut, aż ser się roztopi, a brzegi będą złociste."
                ]),
                'sumOfIngredients' => json_encode([
                    'Ciasto na pizzę' => '1 sztuka',
                    'Sos pomidorowy' => '100g',
                    'Mozzarella' => '150g',
                    'Szynka' => '100g',
                    'Pieczarki' => '100g',
                    'Karczochy (marynowane)' => '50g',
                    'Czarne oliwki' => '30g',
                    'Oliwa z oliwek' => '1 łyżka',
                    'Oregano' => 'szczypta'
                ]),
                'calories' => 300,
                'type' => 'Danie główne',
                'kitchen' => 'Włoska',
                'foodPreferences' => 'Classic',
                'weeklyRecipeCount' => 3,
                'isApproved' => true,
            ]
        ];
           
        

        DB::table('recipes')->insert($recipes);
    }
}
