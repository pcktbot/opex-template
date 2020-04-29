# opex-template

Configure Dockerfile and environment variables.

## Build Setup

This is a full stack application template. It contains a Node/Express server and a Nuxt/Vue frontend. Nuxt uses Server rendered pages (SSR) and we run it as a single page application (SPA). We found it a lot easier to develop the API using SPA mode.

After cloning the repo, create a .env file from the .env.TEMPLATE file.

- Authentication and Updatables are private npm packages and require an NPM_TOKEN to access.
- Database connections can be direct with GCP Cloud SQL with installed SSL certs. Those will need to be present and the production server's IP whitelisted.

# Development

``` bash
npm i
npm run dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
Built Using [Cloud Native JS](https://www.cloudnativejs.io/)
### Using Docker

``` bash
docker build -t opex_template .
docker run -p 5000:5000 opex_template
```

Using Kubernetes and Helm (via Homebrew)

``` bash
brew install helm
```

# Deploying the app
This assumes that you are connected to the correct kubernetes cluster

## Build, Tag, Push the Docker Image 

``` bash 
docker build -t [buildName] .
docker tag [buildName] [repo]:[version]
docker push [repo]:[version]
```

## Deploy the app 
Make sure that the repository and tag match the docker image before running this
``` bash 
helm install [NAME] [CHARTPATH]
```

## Update the app
``` bash 
helm upgrade [NAME] [CHARTPATH]
```
