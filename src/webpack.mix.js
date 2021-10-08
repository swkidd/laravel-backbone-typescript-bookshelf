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

mix.js("resources/js/plugins.js", "public/js/")
    .ts("resources/ts/main.ts", "public/js/main.js")
    .extract(["jquery", "popper.js", "lodash", "backbone", "axios", "bootstrap"])
    .sass("resources/sass/app.scss", "public/css/app.css")
    .sass("resources/sass/bootstrap.scss", "public/css/bootstrap.css")
    .sass("resources/sass/fontawesome.scss", "public/css/fontawesome.css")
    .copy(
        'node_modules/@fortawesome/fontawesome-free/webfonts',
        'public/webfonts'
    );
