# Hotel Reservation App

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | port to run the node server            | 8080    |
|MONGO_USER           | the mongo DB user account           | root    |
|MONGO_DATABASE           | name of the DB           | hotel    |
|MONGO_PASSWORD           | database password           | -    |
|JWT_SECRET           | The secret key used to sign JWR web tokens           | -    |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 14.18.1


# Getting started
- Clone the repository
```
git clone  https://github.com/Mumalo/HotelReservation.git
```
- Install dependencies
```
cd HotelApp
npm install
npm install -g typescript
```
- Build and run the project (current for dev env)
```
npm link typescript
npm run dev
```
  Navigate to `http://localhost:8080`

- API Document endpoints

  Graphql Endpoint :  http://localhost:8080/graphql
  
 ![](./Screenshot 2022-01-02 at 22.46.50.png?raw=true "Graphql server running")


# TypeScript + Node 
The main purpose of this repository is to show a project setup and workflow for writing Graphql with Typescript in NodeJs. 
It also demonstrates how code can be arranged to scale for potentially large projects.


## Getting TypeScript
Add Typescript to project `npm`.
```
npm install -D typescript
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/config**           | Application configuration including environment-specific configs 
| **src/graphql/resolvers**| graphql queries and mutations 
| **src/graphql/typedefs** | graphql types                       
| **src/graphql/index.ts** |Entry point to graphql apollo server                      
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src/services**         | Services hold the application logic  |
| **src**/repositories     | Data repositories                                                              |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript                                                  |

## Building the project
### Configuring TypeScript compilation
```json
{
    "compilerOptions": {
      "target": "es2016",
      "module": "commonjs",
      "outDir": "dist",
      "rootDir": "./src", 
      "strict": true
    },
    
    "include": [
      "src/**/*.ts"
    ],
    "exclude": [
      "src/**/*.spec.ts",
      "test",
      "node_modules"
    ]
  }

```


## Models In the Application
User - holds user information (username, password, roles)
Role - holds the authorities allowed in the system. The following authorities are allowed
   - ROLE_ADMIN
   - ROLE_USER
Room - Holds information about a room. There are currently three room types.
   - SINGLE (single room)
   - DOUBLE (double room)
   - PREMIUM (premium room)
Reservation - Holds information about rooms and reservations made. A user is allowed to reserve more than one room.
However, conflicting reservations are not allowed.  

# Project Features
- **User Registration** Register new user into the system
- **User login** Login with jwt authentication 
- **Manage Rooms** Create and update (update only available for admins) rooms  
- **View free rooms** view free rooms for booking
- **Make Reservation** Login and book a room on a free room. Conflicting reservations are not allowed
- **View Reservations** Admin can view all reservations while user can only view theirs

**Upcoming Feature**
- **Recommended Rooms** When all rooms have been reserved, recommend rooms for user based on defined criteria 
(e.g add n days to the input date range and search for rooms that *will be free* by then)
