# Installation (我們該如何跑起這個 server)
- git clone https://github.com/chuang8511/hero_api.git
- npm install
- Set up your local DB.
- please remeber to register the user first by `$ npm run register_user`
- start your local redis server
- `$ npm run job` -> cron jobs to fetch data
- `$ npm run serve` -> API server

## How to set up your local DB?
- Download PostgreSQL
- Set src/app-data-source.ts with your user_name & database.

### PostgreSQL command
- `$ psql postgres` in your terminal, you will access to postgres server
- `postgres=# create database your_database_name;`, it will create a db for you.
- `postgres=# \q`, it will exit postgres server

### How to start redis server?
- `$ brew install redis`
- `$ brew services start redis`


# Structure (專案的架構，API server 的架構邏輯)
## About system design
![Alt text](./visualization_doc/all_system_design.png)

## About database design
![Alt text](./visualization_doc/hero_profile_data_table.png)

### Not Api server
- apis (To call external apis)
  - responses (To format the response from external apis)
- crons (The jobs to fetch data in a period)
- cache (The key-value noSQL to save the CPU resources)
### Api server
- controllers (To define which logic/persistence/service to access.)
- routers (To map endpoint and controller/action)

### data
- entity (ORM to make the data easy to maintain)
- persistences (To process the data logic)
- data (To save data by patch)

### business logic (Or renaming it as domain model)
- services (To process the business logic)

#### Note
1. Why do I separate api response and entity in this case?
We will have more flexibility to de-couple the relationship between API response and data model.
So, I divide them into two different layers, which is persistences layer and APIs layer.



# About test code
#### It will be good to increase the test coverage to some extent.
```
- tests
-- apis
-- crons
-- ...
```
Note
- Because of time limitation, I will only do the test of the controller, which contains more logics in this projects.
- I have used stub/mock skills in the controller test code. So, I decide to skip other test code first.

# Libraries (你對於所有使用到的第三方 library 的理解，以及他們的功能簡介)
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

# 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解
I do not write the command unless there are legacy that the logic are hard to be explained by code.
Normally, I write the code that can explain the logic.


# 在這份專案中你遇到的困難、問題，以及解決的方法
1. About route
I am surprised that authenticated api is GET.
I do not know how to differentiate the same route but differet header.
But, I have multiple layers to deal with this kind of situation.
So, I can deal with this problem in the Route layer.
