# Thesis Web #


## Description ##


* Web component of thesis project


## Software Architecture (High Level) ##


* This backend-independent webapp is built on [React](https://facebook.github.io/react/) with [Redux](https://github.com/reactjs/redux) for managing view states and [React Router](https://github.com/ReactTraining/react-router) for routing.


## Technical Requirements ##


* Node.js 6.3.1
* Sass ~3.4.22
* JavaScript ES6
* NPM ~3.10.3 


## How to set up a local environment ##

NPM installs project dependencies (only needed once).  Webpack builds the frontend CSS and JS files and runs a development server

After cloning the repo:
```
npm install
```


## How to run the project for development after setup ##

Webpack runs a development server and hot reloads components that have been changed in the /src/ folder
```
npm start
```
The site is served at [http://localhost:3000](http://localhost:3000)

[React Storybook](https://github.com/storybooks/react-storybook) is available on [http://localhost:9009](http://localhost:9009)


## How to run the project for production ##

This compiles the minified files for production
```
npm run build
```

[Deploy to S3](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af#.zgzmaurw0)