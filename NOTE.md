# Containerize
#### To be understood
1. port:port?
2. what does depends_on do?
3. How to run & map multiple containers
4. How to persist data when the container is killed. (Study volumes)

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