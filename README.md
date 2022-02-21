# Comalatech Bank Account Manager

Dear Comalatecher, welcome to the Bank Account Manager an application developed in **NodeJS** `v16.X` and npm `v8.x`. To run this application you must install the following software:

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/es/) (you could install nvm and manage version easier than directly install)

Once you installed this software, then you can run directly `make start` or `make start_dev` (With this code before running the application, we are ensuring all code is valid, because we ran unit and integration test). If you aren't able to run make, you could follow this on the root folder of the project:

1. `npm install`
2. `docker-compose --profile infra up --detach`
3. `yarn start` or `yarn dev`

The application is running when the console shows this log:

```sh
[1645372787710] INFO (bank-account-manager/56695 on LEN-INV742): up and running in development @: LEN-INV742 on port: 3000}
```

If you are seeing this logs is because redis is not running correctly:

```sh
node:internal/process/promises:246
          triggerUncaughtException(err, true /* fromPromise */);
          ^

Error: connect ECONNREFUSED 127.0.0.1:6378
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16)
Emitted 'error' event on Commander instance at:
    at RedisSocket.<anonymous> (/home/optivamedia/Documents/Personal/bank-account-manager/node_modules/@node-redis/client/dist/lib/client/index.js:338:14)
    at RedisSocket.emit (node:events:390:28)
    at RedisSocket._RedisSocket_connect (/home/optivamedia/Documents/Personal/bank-account-manager/node_modules/@node-redis/client/dist/lib/client/socket.js:117:14)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Commander.connect (/home/optivamedia/Documents/Personal/bank-account-manager/node_modules/@node-redis/client/dist/lib/client/index.js:162:9)
    at async Function.getClient (/home/optivamedia/Documents/Personal/bank-account-manager/dist/contexts/shared/infrastructure/persistence/redis/redisFactory.js:29:9)
    at async ExpressServer.initInfra (/home/optivamedia/Documents/Personal/bank-account-manager/dist/common/server.js:74:29) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6378
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

## How I developed the application?

For this development I try to follow [Domain Driven Design pattern](https://martinfowler.com/tags/domain%20driven%20design.html) with [Hexagonal Architecture](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749). Following this philosophy allows us to have very separate functionality for each of the use cases that we want to develop.

Along the time, it is most likely that the core of our application will remain unchanged (domain layer and application layer) and we could change the storage system or the elements which we communicate our different use cases (instead of apply a memory bus, we might need a Kafka or EventBridge bus). It would be enough to make the specific implementations for those components and then, through dependency inversion, facilitate it to the most internal layers to continue giving functionality to our system.
