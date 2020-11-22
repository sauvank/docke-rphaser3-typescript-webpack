# docker-phaser3-typescript-webpack


##### Fork of the project https://github.com/jakubzet/phaser3-typescript-boilerplate.git with the integration of docker

#### How to run install :

* docker-compose -f docker-compose.builder.yml run --rm install
* docker-compose up
* open url http://localhost:8080

#### Build for prod
* docker-compose -f docker-compose.builder.yml run build-prod

#### Build for dev
* docker-compose -f docker-compose.builder.yml run build-dev

Files build is in directory : app/build/{env}
