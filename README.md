![Title](https://image.ibb.co/gg2ST5/logo3.png)

A one-stop social media manger for posting to Facebook and Twitter.

## Live Playground

For example of the social media manager in action, go to https://herokuapp.com/iris.

OR

To run that demo on your own computer:

- Clone this repository
- `npm install`
- Visit http://localhost:3000/

## Team

This project is created by the following members from Oasis72 at Hack Reactor.
  - Apruva Shastry ([@apurvaaa](https://github.com/apurvaaa))
  - Eugene Shifrin ([@eshifrin](https://github.com/eshifrin))
  - Gary Wong ([@gary-w](https://github.com/gary-w))

## Table of Contents

  1. [Features](#features)
  2. [Architecture Overview](#architecture-overview)
    1. [Tech Stack](#tech-stack)
    2. [System Architecture](#system-architecture)
    3. [Database Schemas](#database-schemas)
  3. [Contributing](#contributing)

## Features

Login to immediately schedule posts to Facebook and Twitter.

* **Create new post** and post immediately to Facebook and Twitter.
* **Schedule posts** to Facebook and Twitter at a specific future time. 
* **Calendar view** of Facebook posts and Tweets that are still pending to be sent.
* **Check history and stats** of Facebook posts and Tweets which are already sent.

// Add features gif here.

## Architecture Overview

### Tech Stack

The front-end is written in React and Redux, using Auth0 for authentication. The back-end uses Node/Express and a Mongo database, with Mongoose as the ORM.

### System Architecture

![Database schemas](https://image.ibb.co/mUqg5k/diagram.png)

### Database Schemas

![Database schemas](https://image.ibb.co/d51zrQ/schema.png)

There are two main entities in the database: **users** and **posts**.

## Contributing

If you'd like to contribute to this repo, here are all th steps you need to get started.

### Installing Dependencies

From within the root directory:

```
npm install
```

### Include .env variables
```
AUTH0_CLIENT_ID
AUTH0_DOMAIN
AUTH0_CLIENT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
TW_KEY
TW_SECRET
FB_ID
FB_SECRET
```

## Copyright & License 

Copyright (c) 2017 Oasis72 - Released under the [MIT license](LICENSE).
