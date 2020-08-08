## Before you run the server
Create a ".env" file in the root folder and add the following variables
```
MONGO_URI=your mongodb database uri, can be local or hosted on the cloud
SECRET=the secret for authentication
```

## How to run
**NOTE**: Make sure you have "nodemon" installed.
To install nodemon
```bash
npm i -g nodemon
```
### Server

```bash
npm start
```

### Client (Not fully ready)
```bash
cd client
yarn start
```

## Endpoints for the server
Not yet documented, but the comments are there in the routes folder