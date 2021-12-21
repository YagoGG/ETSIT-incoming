# ETSIT-incoming

This is the web app we use at [ETSIT-UPM](https://www.etsit.upm.es/) to handle
academic exchange applications for incoming students.

## System requirements

- Node.js v16 or greater.
- A database compatible with [Sequelize's
dialects](https://sequelize.org/v5/manual/dialects.html). A [Docker container
with PostgreSQL](https://hub.docker.com/_/postgres) is recommended.

## Data sources

The app uses mainly two sources for data:

- Local database.
- [apiUPM](https://www.upm.es/apiupm/index.html).

## Docs

- [Design](./docs/design.md)
- [Developer guide](./docs/developer_guide.md)
- [Config file](./docs/config_file.md)
