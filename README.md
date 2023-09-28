
# Contacts Frontend

This repository houses code for a TypeScript/React powered frontend for a web application that allows registered users to manage a set of contacts. The frontend is configured to make requests against a Rust backend with endpoints for user registration, login, and token requests. The client also relies on the backend that has a CRUD api for making user and contact related data management operations.

After successfully logging in or registering, a contacts page becomes available where the user may create, update, and delete their contacts. The frontend uses local storage to manage data inbetween browser sessions.






## Authors

- [@judahhigh](https://www.github.com/judahhigh)


## Tech Stack

**Framework:** Reaact (https://react.dev/)

**Styling:** Material UI (https://mui.com/)

**HTTP:** Fetch (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Error handling:** ts-results (https://github.com/vultix/ts-results)

**State management:** Recoil (https://recoiljs.org/)



## Environment Variables

To run this project, you will need to add the following environment variables to a root level .env file

`REACT_APP_HOST` The hostname of the backend server, for example "localhost"

`REACT_APP_PORT` The port of the backend server, for example "8080"

`REACT_APP_SCHEME`The scheme of the backend server, for example "http" 


## Run Locally

To run the frontend locally you must install dependencies and then standup up the client. I use the yarn package manager.

```bash
  git clone git@github.com:judahhigh/contacts-frontend.git
```

Go to the project directory

```bash
  cd contacts-frontend
```

Install all dependencies

```bash
  yarn install 
```

Start the frontend client.

```bash
  yarn start
```

Since this frontend is configured to make requests against the backend, you must initialize and start the backend server locally to fully demo the Contacts web app project. Clone the backend repository, which is available at https://github.com/judahhigh/contacts-backend