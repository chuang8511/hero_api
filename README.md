# Libraries
## express
- The framework to build routes and API server.

## typescript
- for static declaration to make the code easier to maintain.
### Steps
1. `$ npx tsc --init` to initialize TypeScript
2. It will generate tsconfig.json
3. customize your the tsconfig.json (e.g. rootDir & outDir)

## TypeORM
- for object-relation mapping
- It will be easy to inject and collect data
### Steps
- It needs to set the app-data-source.ts
### Doc
- https://typeorm.io/

## Cron
### Why do I need this?
To speed up client side API, we can save data previously before users fetch API.

### How to run the job?
- `$ npx ts-node src/crons/xxxJob.ts`
Note: if using `$ node xxx.js`, it will not initialize DB first, which caused a bug when inserting data.

# Structure
- apis
  - responses
- controllers
- crons
- entity
- persistences
- routers
- services

## Why do I separate api response and entity in this case?
We will have more flexibility to de-couple the relationship between API response and data model.
So, I divide them into two different layers, which is persistences layer and APIs layer.


# Installation
1. git clone https://github.com/chuang8511/hero_api.git
2. npm install
3. Set up your local DB.
4. `$ npm run job` -> cron jobs to fetch data
5. `$ npm run serve` -> API server

## How to set up your local DB?
1. Download PostgreSQL
2. Set src/app-data-source.ts with your user_name & database.

### PostgreSQL command
1. `$ psql postgres` in your terminal, you will access to postgres server
2. `postgres=# create database your_database_name;`, it will create a db for you.
3. `postgres=# \q`, it will exit postgres server
