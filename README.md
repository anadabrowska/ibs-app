# IBSMonitor

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Local setup](#local-setup)
- [Hosting](#hosting)
- [Create migrations](#create-migrations)

## General info

IBSMonitor is an application designed for people with irritable bowel syndrome, created to improve their quality of life by constantly monitoring their daily habits. It is also designed for people with disabilities and available on many devices. It was created as a final University project.

## Technologies

Client side technologies:

- Typescript
- React
- Next.js
- Apollo Client
- Chakra UI
  Server side technologies:
- Node.js
- PostgreSQL
- Redis
- GraphQL
- TypeORM
- TypeGrapQL

## Local setup

1. install node and yarn
2. setup PostgreSQL and create `isp-app` database
3. in server folder create `.env` based on `.env.template`
4. in client folder create `.env.local` based on `.env.local.template`
5. cd to server folder and run

```
$ yarn install
$ yarn build
$ yarn start
```

6. in new terminal cd to client folder and run

```
$ yarn install
$ yarn build
$ yarn start
```

## Hosting

Application is temporarily hosted on this domain: [IBSMonitor.ddns.net](https://ibs-monitor.ddns.net/)

## Create migrations

To create new migations run:
`npx typeorm migration:generate -n *migrationName*`
