# back-end Application


## API Documentation 
 *Overview*
This API manages items, fetches weather data, and supports user authentication with JWT. Users can register and log in using their username, and all secured endpoints require a valid JWT token.


## Usage Instructions
1. Clone the repository:
   git clone https://github.com/fitsumbabay/back-end
## Live Site: https://back-end-y5ny.onrender.com
        
2. Install dependencies;
  npm install

3. Set up environment variables in a .env file;

    *PORT*=5000
   *JWT_SECRET*=your_jwt_secret

4. Start the development server;
      npm start

## API Documentation
      Base URL
*Local*: http://localhost:5000/api
*Live*: https://back-end-y5ny.onrender.com


## Endpoints
1. Item Routes
*GET /items*
- Description: Retrieve a list of all items.
- Expected Response:
- Status Code: 200 OK
 - Body:
[
    {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number"
    }
    
]
-------------------------------------------------------------
*POST /items*
- Description: Create a new item.
- Request Body:
{
    "name": "string",        
    "description": "string", 
    "price": "number"        
}


- Expected Response:
- Status Code: 201 Created
  - Body:
{
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number"
}

-------------------------------------------------------------
2. Weather Routes
*GET /weather/:city*
 - Description: Retrieve weather data for a specific city.
 - Parameters: 
     - city (Path Parameter): The name of the city to fetch weather data for.

- Expected Response:
- Status Code: 200 OK
    - Body:
{
    "weather": [
        {
            "description": "string",
            "icon": "string",
        }
    ],
    "main": {
        "temp": "number",
        "pressure": "number",
        "humidity": "number",
    }
}

Error Response:
*Status Code*: 404 Not Found (if the city is not found)
  - Body:
{
    "message": "City not found"
}

*Error Handling*
 - Common errors and their responses include:
    - 500 Internal Server Error:
{
    "message": "Internal server error"
}


3. Authentication Routes
  *POST /auth/register*
      - Description: Register a new user.
      - Request Body:
         {
    "username": "string",
    "password": "string"
}

Expected Response:
   {
    "message": "User registered successfully"
}

*POST /auth/login*
   - Description: Log in and retrieve a JWT token.
   - Request Body