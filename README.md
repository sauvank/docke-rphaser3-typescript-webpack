# docker-phaser3-typescript-webpack


##### Fork of the project https://github.com/jakubzet/phaser3-typescript-boilerplate.git with the integration of docker

#### How to run install :

* docker-compose -f docker-compose.builder.yml run --rm install
* docker-compose up
* open url http://localhost:8080

#### Run local server
* docker-compose -f docker-compose.builder.yml run start

#### Build for prod
* docker-compose -f docker-compose.builder.yml run build-prod

#### Build for dev
* docker-compose -f docker-compose.builder.yml run build-dev

Files build is in directory : app/build/{env}

#### Edit ES lint conf

* Edit file : app/.eslintrc.json ( doc : https://eslint.org/docs/user-guide/configuring )



### Doc

### Image responsive
 - new ImgSrv(scene, ConfImg);
    
#### Tilemap :
 - https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/