const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/js/app.ts", "public/js/app.js")
    .extract(["jquery", "popper.js", "lodash", "backbone", "axios", "bootstrap"])
    .sass("resources/sass/app.scss", "public/css/app.css")
    .sass("resources/sass/bootstrap.scss", "public/css/bootstrap.css");
