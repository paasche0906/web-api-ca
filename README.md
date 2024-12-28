# Assignment 2 - Web API.

Name: Jiacheng Pan
StudentID：20108802
Youtube Link: 

## Features.

 + Favorites Feature
  1. favorites/favoriteModel.js: Defines the schema for storing users’ favorite movies.
  2. favorites/favoriteRoutes.js: Provides endpoints to add, remove, and get a user’s list of favorites.
 + Reviews Feature
  1. reviews/reviewModel.js: Defines the schema for storing reviews. The schema includes.
  2. reviews/reviewRoutes.js: Provides endpoints to manage reviews.
 + Movie Feature
  1. Fetch Movies by Genre
  2. Get movies with ratings higher than a specified value
  3. Get movies based on the year provided
  4. Gets movies whose original language is the specified value
  5. Get all movies from TMDB
  6. Get Images from TMDB
  7. Get upcoming movies from TMDB
  8. Get popular movies from TMDB
  9. Get trending movies from TMDB
  10. Get top-rated movies from TMDB
  11. Get genres from TMDB
  12. Get credits from TMDB
  13. Get recommendations movies from TMDB
  14. Get similar movies from TMDB
 + tmdb-api.js: Contains helper functions to interact with The Movie Database (TMDB) API.


## Setup requirements.

### Back-end: movies-api
1. Clone the Repository
- git clone [<repository-url>](https://github.com/paasche0906/web-api-ca.git)
- cd movies-api
2. Install Dependencies
- npm install
3. Environment Variables
- Create a .env file in the root directory.
- Add the following environment variables.
4. Database Setup
- node initialise-dev/initDevDB.js
- Start Mongodatabase in Atlas
5. Run the Application
- npm run dev

### Front-end: react-movies
1. Start by cloning the repository from GitHub. Run the following command in your terminal:
  git clone [<repository_url>](https://github.com/paasche0906/web-api-ca.git)
2. Navigate to the cloned project directory:
  cd Movies
3. Install Dependencies: Run the following command to install all necessary dependencies:
  npm install
4. Create a .env file in the root directory of your project.
Add the required environment variables as specified in the documentation. The file should contain variables like API keys for the movie database, Firebase configurations, and any other sensitive information needed. For example:
- REACT_APP_TMDB_KEY=31af661a7adcb32ae044337494e0f685
- FAST_REFRESH=false
5. Ensure that Firebase is correctly configured.
Update src/firebase.js with your specific Firebase project credentials. This will typically include keys like API key, authentication domain, project ID,etc.   
6. Run the Application: To start the development server, run the following command:
- npm start
Open http://localhost:3000 in your browser to see the application in action.


## API Configuration
______________________

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://jiahchengpan:panjiacheng0906@tasky.o4eno.mongodb.net/?retryWrites=true&w=majority&appName=tasky
TMDB_KEY= The API key for accessing TMDb (The Movie Database), which provides information about movies, actors, and related data.
SECRET=ilikecake
secret= A secret key typically used for signing or encrypting tokens (for instance, JSON Web Tokens). This key helps secure authentication processes or other sensitive operations.
______________________

## API Design
1. Movies API
|Endpoint|HTTP Verb|Description|
|----|----|----|
2. 

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
