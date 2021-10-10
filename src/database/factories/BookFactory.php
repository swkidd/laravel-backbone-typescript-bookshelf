<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        "author" => $faker->name(),
        "title" => ucwords(implode(" ", $faker->words(rand(1, 4))))
    ];
});
