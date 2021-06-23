# UFO app

This is a React app that allows users to mark **UFO Sightings** where we use the Google Maps API, Google Places API, and browser geo location. All using React (hooks).

A user can click on the map to add a marker which will be stored in the database so later users can see it. A user can also type a location on the search bar to navigate to that destination where they can enter more markers. Markers can also be deleted by clicking on the delete button on each UFO.

## Links

You can use the app by navigating to: https://ufo-client.herokuapp.com/


## API Keys

For this demo to work, please create a Google Map API Key, and ensure that the two services below are enabled... otherwise it won't work! This API key must be in the environment variable `REACT_APP_GOOGLE_PLACES_API_KEY`.

- Maps JavaScript API
- Places API
- Geocoding API

## Libraries

This project utilizes a React front end and an express back end.
It also uses libraries such as dotenv, sequelize, axios, material UI, Elephant Sql database as well as other frameworks.

## How to run the project

In order to run this project you will need to clone the repository, install the npm modules with the command npm install, after the modules are installed you will need to navigate to both server and client directories and start the project on each folder with the commands _npm start_ you can view the project on http://localhost3000

## This app was done as a coding challenge with a 24hr deadline.
