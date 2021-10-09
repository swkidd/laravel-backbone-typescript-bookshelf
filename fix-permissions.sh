sudo chown -R $USER src
sudo chgrp -R docker src
docker-compose exec laravel chown -R www-data storage