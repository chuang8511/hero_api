# Containerize
#### Learning
1. port:port?
docker run -p [HOST_PORT]:[CONTAINER_PORT] [IMAGE]
Ref: 
- https://medium.com/@AbbasPlusPlus/docker-port-mapping-explained-c453dfb0ae39
  - After setting up port forwarding, any request sent to port 3000 on the host machine is automatically forwarded to port 3000 in the container.
  - Best Practices for Port Forwarding
    1. Choose Non-Standard Host Ports: Avoid using common ports on the host to reduce security risks and conflicts.
    2. Consistency in Development and Production: Keep port mappings consistent across development and production environments for simplicity.
    3. Document Port Mappings: Maintain clear documentation of which host ports map to which container ports.

Why does postgres need to set different ports?
- 5432 in HOST_PORT has been mapped to postgres in local host.
- So, if we keep using 5432, it will access to postgres in local machine when we use Postico.

2. what does depends_on do?
Doc:
- https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on
  - docker-compose up starts services in dependency order. In the following example, db and redis are started before web.
  - docker-compose up SERVICE automatically includes SERVICE's dependencies. In the example below, docker-compose up web also creates and starts db and redis.
  - docker-compose stop stops services in dependency order. In the following example, web is stopped before db and redis.

3. How to run & map multiple containers
- Ref:
  - Dockerfile.app & Dockerfile.cron & docker-compose.yml
  - https://docs.docker.com/compose/compose-file/compose-file-v3/#context
    - Either a path to a directory containing a Dockerfile, or a url to a git repository.


4. How to persist data when the container is killed. (Study volumes)
- Doc:
  - https://docs.docker.com/guides/walkthroughs/persist-data/
  - It requires to download the latest docker in your machine.
  - More details: https://docs.docker.com/storage/volumes/

### Scattered note
- if you add the -d flag, it runs the containers in the background, detached from the terminal, and you won't see the container logs in your terminal.

#### Basic command
`$ docker build .`
`% docker image ls`
`% docker build . --tag hero_api:latest`
- https://docs.docker.com/engine/reference/commandline/image_build/
`$ docker ps -a`
- list all container

`$ docker exec -it <container_name> bash`
- access into the container

`% docker logs -ft <container_name>`
- check the log in the docker

`$ docker system prune`
- delete all container

`$ docker rm <container_name>`
- delete a container

#### About PostgreSQL in container
`$ docker run --name postgres-123 -e POSTGRES_PASSWORD=hahow_project -e POSTGRES_USER=postgres -e POSTGRES_DB=hahow_project -p 1311:5432 -d postgres:latest`

`% docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' <container_name>`
- Check the log in container

`$ docker exec -it postgres-123 psql -U postgres`
- get into container and access to postgres server.