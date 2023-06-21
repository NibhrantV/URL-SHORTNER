# URL_Shortener_ACM_Project
>## Open Projects 2023
## Abstract
The URL shortener web project is a Node.js application using Express and MongoDB.
It shortens long URLs, stores them in a database, and provides shortened URLs that redirect to the original ones. 
Users can search for URLs based on notes and create/update short URLs.
It provides autocomplete-search suggestion using mongodb.
The project has a clean interface, utilizes dotenv for environment variables, and enhances the user experience with static assets.
It simplifies URL sharing and management.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- shortid
- GitHub
  
## Getting started
### Prerequisites 
- Node.js installed on your machine.
- MongoDB Atlas account (or a local MongoDB instance) for database storage.
- Basic knowledge of Express.js and Mongoose.


### Steps 

*1. Clone the repository:*

- Clone the project repository or download the project as a zip file and extract it on your local machine.

*2. Install dependencies:*

- Open the command prompt and navigate to project’s root directory.
- Run the following command to install the required depecndecies:
 `npm install`
- Dependencies:
`dotenv: ^16.3.1`
`ejs: ^3.1.9`
`express: ^4.18.2`
`mongoose: ^5.13.17`
`shortid: ^2.2.15`
`nodemon: ^2.0.22`
-Also install shortID using:
`npm i shortId`

*3. Set up MongoDB Database:*
- Create a MongoDB Atlas account or use an existing one.
- Log in to your MongoDB Atlas account and create a new project.
- Within the project, create a new cluster or use an existing one.
- In the cluster, navigate to the "Database Access" section and create a new database user with appropriate privileges. Remember the username and password for this user.
- Click on the "Connect" button in "Database Clusters" tab for your cluster.
- Choose the option "Connect your application" and select the appropriate driver and its version (e.g., Node.js and the latest version).
- Copy the provided connection string, which includes the necessary credentials and configuration for connecting your application to the MongoDB Atlas cluster.

*4. Set Up Search Index:*
- Open the MongoDB Atlas dashboard and navigate to your cluster.
- In the created 'shorturls' collection, click on the "Search" tab.
- Create a new search index and save it. Keep note of the index name.
- In the project's root directory, create a new file named ‘.env’.
- Inside the ‘.env’ file, add the following variables:

  `ATLAS_URI=<mongodb-connection-string>`
  `SearchIndex=<search-index-name>`
- Remeber to use actual password instead of (password) in connection string.

*5. Start the application:*

   `npm Start`
 - Open your web browser and visit http://localhost:3000 to access the URL shortener application.

## Usage

- Enter a long URL in the Create URL column and click the "Shorten" button to generate a short URL.
- You can optionally create Custom URL or add some notes to the URL before shortening it.
- The shortened URLs will be displayed on the main page along with their corresponding full URLs,short URLs clicks and notes.
- To search for URLs based on notes, enter a search query in the search for URL input bar and click the "Search" button.
- While typing it will use autocomplete to give recommendation in the drop down menu.
- You can search the url through your long url or notes. Matching URLs will be displayed.
- Every time a short URL is used the click count will increment.

## Implementation

The URL shortener application follows the following internal working:

### Importing dependencies and setting up the Express application:
- The express module is used to create the Express application.
- The mongoose module is used to connect to the MongoDB database.
- The ShortUrl model is imported from the shortUrl.js file.
- The dotenv module is used to load environment variables from a .env file.
- The Express application is created and configured.

### Connecting to the MongoDB database: 
- The mongoose.connect() method is used to establish a connection to the MongoDB database.
- The MongoDB connection string is read from the process.env.URL environment variable.

 ### Defining Routes:
 - Routes are defined using the app.get(), app.post(), or similar methods provided by Express.js.
 - Each route is associated with a specific HTTP method (GET, POST, etc.) and a path.
 - The routes define the functionality to be executed when a request matching the method and path is received by the server

 ### Route Handling Functions:
 - For each route, a callback function is provided to handle the request and response objects.
 - The callback function is executed when a matching request is received.
 - The callback function can perform various operations, such as fetching data, modifying the database, rendering views, or sending responses back to the client

 ### Middleware Functions:

 - Express.js also supports the use of middleware functions.
 - Middleware functions are functions that have access to the request and response objects and can perform operations before or after the route handling function.
 - Middleware functions can be used for tasks such as parsing request bodies, authentication, logging, error handling, etc.
 - In the provided code, the express.urlencoded() middleware is used to parse URL-encoded request bodies
 
 ### Error Handling:
 - The code includes basic error handling using try-catch blocks and sends appropriate error responses.
 - If an error occurs during route execution, the code catches the error and sends an error response with the appropriate status code and error message
 
### AutoComplete Functionality:
 - The autocomplete functionality in the code is implemented using MongoDB's text search feature and the aggregation framework.
 - When a GET request is made to the "/autocomplete" route, the associated route handling function is executed.
 - The route handling function extracts the search query from the request query parameters.
 Two separate aggregations are performed: one for the "full" field and one for the "note" field of the ShortUrl collection.
 - Each aggregation operation consists of two stages: $search and $limit.
 - The $search stage utilizes MongoDB's text search feature and specifies the index to use ("urls") and the autocomplete configuration with the query and the path to search for (either "full" or "note").
 - The $limit stage is used to limit the number of autocomplete results to 5.
 - A $project stage is used to define the fields to include in the response. The _id field is explicitly excluded, and the short and note fields are included.
 - The combined autocomplete results are sent back as a JSON response.
 - Error handling is implemented using try-catch blocks to catch any errors during the search or response sending process.
 - If an error occurs, an appropriate error response with the corresponding status code and error message is sent


Key Takeaways:

- Integration with MongoDB: The code demonstrates how to connect and interact with a MongoDB database using Mongoose in a Node.js application.
- Express.js Routing: The code showcases how to define routes and handle HTTP requests using Express.js, allowing for easy request handling and route management.
- Autocomplete Functionality: The code implements autocomplete search using MongoDB's text search feature and the aggregation framework, enabling the retrieval of matching results based on user input.
- Error Handling: The code includes basic error handling using try-catch blocks to catch and manage errors that may occur during database operations or request processing.
- Using MongoDB's text search capabilities for searching URLs based on notes.
-	Using ATLAS search for full text search in database.
-	Managing environment variables with dotenv.
-	Handling form submissions and parsing form data.
-	Rendering dynamic views with EJS templates.
These key takeaways summarize the important aspects of the code, emphasizing its integration with MongoDB, routing using Express.js, autocomplete functionality, error handling, usage of environment variables, and dependency management using npm.

  ## Refrences ##
  - https://www.youtube.com/watch?v=SLpUKAGnm-g&t=1098s
