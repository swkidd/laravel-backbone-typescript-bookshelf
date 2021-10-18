## Requirements
- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)
- [NPM (for WebPack)](https://nodejs.org/en/)

## Live Version
A live version of the application can be accessed [here](http://ec2-35-76-13-167.ap-northeast-1.compute.amazonaws.com/auth/login)

## About
A simple book shelf application build with Laravel and Backbone.js (TypeScript).

## Usage
Login or register to begin creating, editing and deleting books. Search for books by title, author or both. Export books in CSV or XML.

## Frontend
Frontend application built with [Backbone.js](https://backbonejs.org/) in TypeScript. All files are bundled first with Babel for TypeScript and then through webpack with laravel-mix, targeting ES6 JavaScript. Icons provided by [FontAwesome](https://fontawesome.com/). CSS is [Bootstrap](https://getbootstrap.com/). Jest is used for model testing


## Backend
The backend is [Laravel](https://laravel.com) version 6.20. I avoided using any addons on the backed. Authentication is session based on both web and API routes. With the exception of auth pages, the main application is single page with routing handled by Backbone.js. [Phpunit](https://phpunit.de/) is used for testing. There is a [GitHub action](https://github.com/swkidd/laravel-backbone-bookshelf/blob/assignment01/.github/workflows/laravel.yml) on this repo to run the tests every time code is pushed.

## Setup
1. Clone the repository.
1. Start the containers by running `docker-compose up --build -d` in the project root.
1. Install the composer packages by running `docker-compose exec laravel composer install`
1. Build the front end by running `npm install && npm run dev` in the `./src` folder.
1. Access the Laravel instance on `http://localhost`.

## Troubleshooting
- If there is a "Permission denied" error, run `docker-compose exec laravel chown -R www-data storage`.
- "require(): Failed opening required '/var/../autoload.php'" error, Install the composer packages by running `docker-compose exec laravel composer install`
- "$ not defined" error in browswer console, JavaScript not displaying correctly, run `npm install && npm run dev` from the `./src` directory to build the frontend dependencies with Laravel-mix (webpack).


Note that the changes you make to local files will be automatically reflected in the container.

Have Fun!
