docker-compose up --build -d
cd src
cp example.env .env
npm install
npm run dev
composer update
cd ..
./fix-permissions.sh
docker-compose exec laravel php artisan migrate
