# Assignment 2 - Web API.

Name: Jiacheng Pan
StudentID：20108802
Youtube Link: https://youtu.be/mMauUjN1COk

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

- NODE_ENV=development
- PORT=8080
- HOST=localhost
- MONGO_DB=mongodb+srv://jiahchengpan:panjiacheng0906@tasky.o4eno.mongodb.net/?retryWrites=true&w=majority&appName=tasky
- TMDB_KEY= The API key for accessing TMDb (The Movie Database), which provides information about movies, actors, and related data.
- SECRET=ilikecake
- secret= A secret key typically used for signing or encrypting tokens (for instance, JSON Web Tokens). This key helps secure authentication processes or other sensitive operations.
______________________

## API Design
### Movies API

| Endpoint                                  | HTTP Verb | Description                                                                                     |
|-------------------------------------------|-----------|-------------------------------------------------------------------------------------------------|
| `/api/movies`                             | GET       | Gets a paginated list of movies. Supports query params `page` and `limit` for pagination.      |
| `/api/movies/:id`                         | GET       | Gets the details of a specific movie by its `id`.                                              |
| `/api/movies/mongo/genre/:genreId`        | GET       | Retrieves movies that match a specific genre ID stored in MongoDB.                             |
| `/api/movies/mongo/rating`                | GET       | Gets movies with a rating higher than a specified value. Accepts `minRating` as query param.   |
| `/api/movies/mongo/year/:year`            | GET       | Retrieves movies released in a specified year.                                                 |
| `/api/movies/mongo/language`              | GET       | Gets movies by their original language. Accepts `lang` as a query param.                       |
| `/api/movies/tmdb/all`                    | GET       | Retrieves all movies from TMDB. Supports optional `page` query param for pagination.           |
| `/api/movies/tmdb/upcoming`               | GET       | Retrieves upcoming movies from TMDB. Supports `page` query param.                              |
| `/api/movies/tmdb/popular`                | GET       | Retrieves popular movies from TMDB. Supports `page` query param.                               |
| `/api/movies/tmdb/trending/today`         | GET       | Retrieves trending movies for today from TMDB. Supports `page` query param.                    |
| `/api/movies/tmdb/top_rated`              | GET       | Retrieves top-rated movies from TMDB. Supports `page` query param.                             |
| `/api/movies/tmdb/genres`                 | GET       | Retrieves a list of genres from TMDB.                                                          |
| `/api/movies/:id/images`                  | GET       | Retrieves images related to a specific movie by its `id`.                                      |
| `/api/movies/:movieId/credits`            | GET       | Retrieves the cast and crew details of a specific movie by `movieId`.                          |
| `/api/movies/:movieId/recommendations`    | GET       | Retrieves movie recommendations based on the `movieId`.                                        |
| `/api/movies/:movieId/similar`            | GET       | Retrieves a list of movies similar to a given `movieId`.                                       |

### Favorites API

| Endpoint                           | HTTP Verb | Description                                                                  |
|------------------------------------|-----------|------------------------------------------------------------------------------|
| `/api/favorites/user/:userId`      | GET       | Retrieves all favorite movies for a specific user by their `userId`.        |
| `/api/favorites`                   | POST      | Adds a favorite movie for a user. Requires `userId` and `movieId` in the request body. |
| `/api/favorites/:userId/:movieId`  | DELETE    | Removes a specific favorite movie for a user by `userId` and `movieId`.     |

### Reviews API

| Endpoint                           | HTTP Verb | Description                                                                                   |
|------------------------------------|-----------|-----------------------------------------------------------------------------------------------|
| `/api/reviews/:movieId`            | GET       | Retrieves all reviews for a specific movie by `movieId`.                                      |
| `/api/reviews/user/:author`        | GET       | Retrieves all reviews created by a specific user (`author`).                                  |
| `/api/reviews`                     | GET       | Retrieves all reviews with pagination support. Query params: `page` and `limit`.             |
| `/api/reviews/high-rating/:minRating` | GET    | Retrieves all reviews with a rating greater than or equal to `minRating`.                    |
| `/api/reviews`                     | POST      | Adds a new review. Requires `movieId`, `author`, `content`, and `rating` in the request body. |
| `/api/reviews/:reviewId`           | PUT       | Updates a review. Accepts `content` and/or `rating` in the request body.                     |
| `/api/reviews/:reviewId`           | DELETE    | Deletes a specific review by its `reviewId`.                                                 |

### User API

| Endpoint        | HTTP Verb | Description                                                                                   |
|------------------|-----------|-----------------------------------------------------------------------------------------------|
| `/api/users`     | GET       | Retrieves a list of all users.                                                                |
| `/api/users`     | POST      | Registers a new user or authenticates an existing user based on the `action` query parameter. |
| `/api/users/:id` | PUT       | Updates user information for a specific user by their ID.                                     |


## Security and Authentication

1. **Authentication Implementation**:
   - **JWT (JSON Web Token)**: The API uses JWT for securing and authenticating user sessions. Tokens are issued upon successful login or registration and must be provided for accessing protected resources.
   - **Token Storage**: Tokens are stored on the client-side in `localStorage` for persisting user authentication status across sessions.
2. **Protected Routes**:
   - Frontend routes requiring authentication are secured using the `ProtectedRoutes` component. This component checks the user's authentication state (via the `AuthContext`) and redirects unauthorized users to the login page.
   - Backend routes are secured using middleware that verifies the provided JWT. This middleware extracts the token from the `Authorization` header, validates it, and ensures the user exists in the database.
3. **API Endpoints**:
   - **Login and Signup**: The `/users` endpoint supports `POST` requests for user login and registration, issuing tokens upon success.
   - **Favorites**: Endpoints for managing user favorites require authentication, validated using the token sent in the `Authorization` header.
4. **Key Routes**:
   - Public routes:
     - Login (`/login`)
     - Signup (`/signup`)
   - Protected routes (examples):
     - Viewing and managing favorite movies (`/movies/favorites`).
     - Viewing watchlists and adding reviews.
5. **Authorization Middleware**:
   - The backend employs middleware to verify tokens and associate authenticated requests with the corresponding user, enhancing security for all user-specific operations.

## Integrating with React App

Here is the README section that describes the integration of the React application with your custom Web API:

---

## Integration of React Application with the Web API

#### API Integration
Key Features Added

Custom Web API:
Extended the Web API to handle requests for movie data, reviews, and favorites.
Integrated the API with a MongoDB database for persistent data storage, such as user details, reviews, and favorites.

React Frontend Updates:
Replaced direct TMDB API calls with Web API endpoints for key functionalities.
Introduced token-based authentication for secure interactions.

1. **Movies API**:
   - Fetch all movies: `/movies/tmdb/all` (e.g., in the movie listing views).
   - Fetch movie details: `/movies/:id` for detailed movie information pages.
   - Fetch movie images: `/movies/:id/images`.
   - Fetch genres: `/tmdb/genres`.
   - Fetch upcoming, popular, trending, and top-rated movies for dedicated views.

2. **User API**:
   - Login and signup endpoints for user authentication:
     - Login: `/users` (POST).
     - Signup: `/users?action=register`.
   - User information is secured via token-based authentication and stored in `localStorage`.

3. **Favorites API**:
   - Manage user favorite movies:
     - Get favorites: `/favorites/user/:userId`.
     - Add to favorites: `/favorites/` (POST).
     - Remove favorites: `/favorites/:userId/:movieId` (DELETE).

4. **Reviews API**:
   - Manage reviews:
     - Fetch reviews for a movie: `/reviews/:movieId`.
     - Add, update, and delete reviews are supported via `/reviews` endpoints for enhanced user engagement.

#### Views Using Web API
The following views in the React app were updated to use the Web API:

- **Home Page**:
  - Fetches trending or popular movies using `/movies/tmdb/trending/today` or `/movies/tmdb/popular`.

- **Movie Details Page**:
  - Fetches movie details (`/movies/:id`) and images (`/movies/:id/images`).

- **Favorites Page**:
  - Displays a user's favorite movies using `/favorites/user/:userId`.

- **Reviews Section**:
  - Shows reviews for movies using `/reviews/:movieId`.

- **Authentication Pages**:
  - Uses `/users` (login and signup).

#### Other Updates
- **API Client Updates**:
  - A centralized `api/tmdb-api.js` file was updated with new functions to interact with the Web API endpoints instead of directly calling TMDB API.
  - Token-based authentication headers were added where necessary.


## Independent learning (if relevant)

#### Login Page Implementation
The **LoginPage** component handles user authentication by interacting with the `authenticate` function provided by the `AuthContext`. Here's a summary of its features:
- **Form Validation**:
  - Ensures both username and password are provided.
  - Validates that the password length is at least 8 characters.
- **Error Handling**:
  - Displays error messages for invalid login credentials or missing inputs.
- **Redirection**:
  - Redirects authenticated users to the requested page or the homepage if no specific route was requested.
- **Design**:
  - Includes user-friendly form elements and error messages, styled with a custom `LoginPage.css` file.

#### Signup Page Implementation
The **SignUpPage** component enables new users to register by submitting their credentials to the Web API. Key features include:
- **Validation Logic**:
  - Checks that the username is at least 5 characters long and uses only valid characters (letters, numbers, underscores).
  - Ensures passwords are at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
  - Verifies that the password and confirmation match.
- **Error Feedback**:
  - Displays descriptive error messages for invalid inputs or mismatched passwords.
- **Successful Registration**:
  - On successful signup, redirects the user to the login page.
- **Styling**:
  - A clean and responsive design implemented in `SignUpPage.css`.

#### Context Integration
Both components use the `AuthContext` to manage authentication state:
- The **`AuthContext`** provides functions for login (`authenticate`) and registration (`register`), as well as state for tracking the current user's authentication status and token.
- Authentication tokens are stored securely in `localStorage` and used for API calls requiring authorization.