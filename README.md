# LEBONCOIN REPLICA - SERVER SIDE

The purpose of this repo is to replicate the famous french website "Leboncoin" using React for the front part and Node.js with Expresss and MongoDB for the server and DB.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

First clone the repo

```
git clone https://github.com/AlexandreBonzom/leboncoin-api.git 
```

And then install all packages on your machine

```
npm install
```

or

```
yarn install
```


## Launch Application

```
npm start
```

## Demo

[Web Site Demo](https://leboncoin-client-replica.herokuapp.com/) The master branch is hosted on heroku. The first loading could be long.



## Built With

- Node.Js with Express
- MongoDB (via mongoose)
- Javascript


### Client side

[Client repository](https://github.com/AlexandreBonzom/leboncoin-exercice) - Front-end of the project.


### Functionalities
* API REST with CRUD - Create , Read , Update, Delete.
* Utilization of middleware to check if user is logged.
* Pictures from Front are send to Cloudinary to be hosted and get an url to stok in DB.
* Password is not stocked directly in database but salted.
* Possible to get fitlered publication if requested.

