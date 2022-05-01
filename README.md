# System Design Capstone
## Backend for Questions and Answers API

### Goal
Support an existing [retail web application](https://github.com/katyfsy/FEC-Project) with a modernized system able to withstand the web scale traffic loads.

### Development Process
1. Research and choose the most suitable database for storing questions and answers datasets: PostgreSQL
2. Design ETL process and seed 15 million+ data into PostgreSQL databse
3. Design and optimize read/write queries to interact with database
4. Deploy server and database on AWS EC2
5. Repeat stress test in production and optimize the system

### Optimizations made to solve database and server bottlenecks
- Create **B-tree indexes** on tables in PostgreSQL database
- Apply **NGINX load balancer** to achieve horizontal scaling with 6 AWS EC2 servers (load-balancing method: least-connected)
- Enable **node caching** to improve server performance

### Outcome
###### Achieved 3000 RPS under 20ms latency by load balancing 6 server instances with node caching
![](/Demo/3000rps.png)

### Tech Stack
- PostgreSQL
- Node.js
- Express.js
- node-cache
- AWS EC2
- NGINX
- Loader.io
- Frisby

### Installation and Setup
To download a copy of this project to your local machine:
```
$ git clone repo_url
```

Runs the app in the development mode.

```sh
$ npm install
```

Set up a `.env` file with the following

+ DB_PORT
+ SERVER_PORT
+ USER
+ PASSWORD

```sh
$ npm run start
```