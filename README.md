# Birthworks

Dashboard to access, filter, and search users in birthworks unified databse.

**Project Manager/Technical Lead:** Ziya Xu, Mohamed Abaker.

**Team Members:**

- Ben Demers
- Silvi Kabra
- Ricky Raup
- Grace Fujinaga
- Joseph Zhang
- Aditya Bhati
- Taran Anantasagar

## Setting Up

#### Recommended Tools Checklist

- Git Clone this repository
- Create a [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- Create a [Heroku account](https://www.heroku.com/)
- Install [Node.JS](https://nodejs.org/en/download/)
- Install [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

##### Configuring Enviromental Variable

Create file called ".env.development" in a "config" folder in the root directory (you may have to create a new config folder).
It should look like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
```

Then, create another file called ".env.development.local" in "src/client", it should look like the following:

```
REACT_APP_API_URL="http://localhost:5000"
```

#### Running Project

For the first time after cloning only:

```bash
$ # setup yarn
$ yarn setup
```

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```
