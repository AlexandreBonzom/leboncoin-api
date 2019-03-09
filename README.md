# leboncoin-api

Server part of Leboncoin's replica. It was an exercise done during the bootcamp.
Here is the link for the front part of the code:
https://github.com/AlexandreBonzom/leboncoin-exercice

The application was developed in a few days and is not perfect.
However, it was good to become familiar with several features used in each web application.

Here are the developed features:

### Registry

The server receives a password. The server salts the password before hashing it. 
So, no password is stored in the database.

### Identify

The email and password are compared to the database (after being salted and chopped).

### Offers

Ability to obtain the list of offers from the database.
A filter generator is created if the search bar is used in front-end part.
Ability to adjust the product base on price, title and to sort them.

Ability to publish an offer once connected, with images. The photos are received encoded in base 64.
Then they are uploaded to Cloudinary, which returns a URL stored in the database.

### User

The user can get the list of his own offers and the possibility to delete them.
