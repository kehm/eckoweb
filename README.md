# ECKO Web
## A React.js application for the ECKO Blockchain

ECKO is a distributed blockchain data consortium for ecological resurvey datasets.  
ECKO Web is a React.js application and is the frontend of the ECKO Blockchain.

To run the application, you must first configure your environment variables. See the .env.example and docker-compose.yaml files for an example.  
The application pulls data from a Strapi CMS instance and connects to the ECKO Blockchain Client to interact with the blockchain.  
Run `npm run start` to start the application or use docker-compose to create an image.  
The docker image runs both the React.js application and an Nginx web server. Add configuration for the web server in the nginx directory before building the image.

This project is created by the University of Bergen (UiB), Norway, and is available under the Apache License, Version 2.0 (Apache-2.0).

Read more about ECKO: <https://ecko.uib.no>
