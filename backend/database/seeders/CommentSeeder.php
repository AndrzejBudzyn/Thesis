<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comments = [
            [
                'recipeId' => 1,
                'userId' => 1,
                'contents' => 'Great recipe! Very easy to follow.',
            ],
            [
                'recipeId' => 2,
                'userId' => 2,
                'contents' => 'Delicious! My family loved it.',
            ],
            [
                'recipeId' => 3,
                'userId' => 1,
                'contents' => 'I added some extra spices, and it turned out great!',
            ],
            [
                'recipeId' => 4,
                'userId' => 2,
                'contents' => 'Perfect for a quick dinner. Thanks for sharing!',
            ],
            [
                'recipeId' => 2,
                'userId' => 1,
                'contents' => 'I wasn’t sure about the measurements, but it worked out well.',
            ],
        ];

        foreach ($comments as $comment) {
            Comment::create($comment);
        }
    }
}