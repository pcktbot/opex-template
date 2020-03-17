# opex-template

Configure Dockerfile and environment variables.

## Build Setup

This is a full stack application template. It contains a Node/Express server and a Nuxt/Vue frontend. Nuxt uses Server rendered pages (SSR) and we run it as a single page application (SPA). We found it a lot easier to develop the API using SPA mode.

After cloning the repo, create a .env file from the .env.TEMPLATE file.

- Authentication and Updatables are private npm packages and require an NPM_TOKEN to access.
- Database connections can be direct with GCP Cloud SQL with installed SSL certs. Those will need to be present and the production server's IP whitelisted.

### Development

``` bash
npm i
npm run dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Production

Using Docker

``` bash
docker build -t opex_template .
docker run -p 5000:5000 opex_template
docker container ls
```

Using Kubernetes and Helm (via Homebrew)

``` bash
brew install helm
helm install opex-template chart/nodeserver
```

Then source your server addresses and open the app in your default browser.

``` bash
export SAMPLE_NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services nodeserver-service)
export SAMPLE_NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
open http://${SAMPLE_NODE_IP}:${SAMPLE_NODE_PORT}
```
#### Build new prod Image
docker build -t [buildName] .
docker tag [buildName] [repo]:[version]
docker push [repo]:[version]

https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app
####DEPLOY

export PROJECT_ID=[PROJECT_ID]

docker build -t gcr.io/${PROJECT_ID}/[buildName]:[version] .

gcloud auth configure-docker
gcloud config set project $PROJECT_ID
gcloud config set compute/zone [COMPUTE_ENGINE_ZONE]

docker push gcr.io/${PROJECT_ID}/[buildName]:[version]

kubectl set image deployment/[name] [name]=gcr.io/${PROJECT_ID}/[buildName]:[version]







# Set Up Cluster
## Set Env Vars
export GCLOUD_PROJECT= Project ID from home in console
export INSTANCE_REGION=us-central1
export INSTANCE_ZONE=us-central1-a
export PROJECT_NAME=helm
export CLUSTER_NAME=${PROJECT_NAME}-cluster
export CONTAINER_NAME=${PROJECT_NAME}-container


## Setup
gcloud config set project ${GCLOUD_PROJECT}
gcloud config set compute/zone ${INSTANCE_ZONE}

## Enable Services
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com


## Create Cluster
gcloud container clusters create ${CLUSTER_NAME} --num-nodes 2

## Get Credentials 
gcloud container clusters get-credentials ${CLUSTER_NAME} \
    --zone ${INSTANCE_ZONE}

## Confirm Connection 
kubectl cluster-info


## confirm the pod is running
kubectl get pods

## enable services

gcloud services enable cloudbuild.googleapis.com

## Build Container
gcloud builds submit -t gcr.io/${GCLOUD_PROJECT}/${CONTAINER_NAME} ../
