# Developer guide

Okay, so you want to contribute to ETSIT-incoming. How do you get started?

## Project setup

1. Make sure you have installed [Node.js](https://nodejs.org/) 16+ or later; we
  recommend using a LTS version. You should install
  [Yarn](https://yarnpkg.com/getting-started/install) as well.
2. [Clone the
  repo](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#_git_cloning)
  in your computer:

  ```bash
  $ git clone <url>
  ```

3. Open a terminal and change the working directory to the freshly cloned repo:

  ```bash
  $ cd ETSIT-incoming
  ```

4. Run install all the dependencies with Yarn:

  ```bash
  $ yarn
  ```

5. The app uses its own database. You can use a PostgreSQL instance that is
already available in your machine, but we highly recommend that you use a Docker
container. To do that, you will need to [install
Docker](https://docs.docker.com/get-docker/) in your computer.

6. Then create a new container with the PostgreSQL image:

  ```bash
  $ docker run \
    --name=etsit-incoming--postgres \
    -e POSTGRES_PASSWORD=somepassword postgres:latest
  ```

  **Remember that whenever you restart your machine, you will need to spin up
  the container with the following command:**

  ```bash
  $ docker container start etsit-incoming--postgres
  ```

7. Then, create a copy of the config file template in the project's root and
fill in the development section with your text editor of choice:

  ```bash
  $ cp config.json.template config.json
  ```

  For guidance on how to complete the config file, see the [config
  file](./config_file.md) docs.

8. Set up the database:

  ```bash
  $ yarn db:reset
  ```

9. Finally, start the app in development mode:

  ```bash
  $ yarn run dev
  ```

In development mode, the app features hot module replacement or HMR, which means
that any changes made in frontend code should be reflected automatically without
the ened to restart the app. Changes in the backend code will trigger an app
restart.

## Becoming familiar with the codebase

Getting acquainted with a new codebase is no easy task. This brief section will
guide you through the app's sources to ease the process.

The project has this structure, which follows a pretty standard
[model-view-controller
(MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
design pattern:

```
ETSIT-incoming
├── docs 
│   # General documentation for the project, the docs you're reading right now.
└── src
    ├── controllers
    │   # Backend logic. These are the middlewares called when a route is
    │   # requested from the server.
    ├── migrations
    │   # Definitions of the changes applied to the app's database (new tables,
    │   # columns, etc.). They are chronologically named, so they can be
    │   # applied in that order when building a new database instance or
    │   # updating a new one (they are applied like "patches" to the database).
    ├── models
    │   # Definitions of the logical entities used by the app. Usually, each of
    │   # these models will have its own table in the database, and the
    │   # relations between them will be defined in this directory's index.js.
    ├── routes
    │   # Associations between the app's routes and the corresponding
    │   # controllers.
    │   └── utils
    ├── seeders
    │   # Some pre-defined entries to populate the database. These are mostly
    │   # useful in development, but they can also be used in production (e.g.
    │   # to create a first admin user).
    ├── static
    │   ├── css
    │   └── images
    ├── test
    │   # A set of unit tests to validate the app's functionality.
    │   ├── controllers
    │   │   # Tests that cover the controllers' logic.
    │   ├── __mocks__
    │   │   # Definitions of mocks for external libs or resources that cannot 
    │   │   # be used as they are.
    │   └── models
    │       # Tests that cover the models' logic.
    ├── utils
    └── views
        # The frontend code that renders the different views of the app.
        └── components
            └── modals
```