#! /bin/bash
cd /var/lib/jenkins/workspace/frontend/
sudo su - jenkins -s/bin/bash
  docker login -u mineck11 --password ck769184@ registry.hub.docker.com
  docker image build -t  $JOB_NAME:v1.$BUILD_ID .
 docker image tag $JOB_NAME:v1.$BUILD_ID mineck11/frontend:v1.$BUILD_ID
 docker image tag $JOB_NAME:v1.$BUILD_ID mineck11/frontend:latest
 docker image push mineck11/frontend:v1.$BUILD_ID
 docker push mineck11/frontend:latest
 #docker image rmi $JOB_NAME:v1.$BUILD_ID  mineck11/frontend:v1.$BUILD_ID  mineck11/frontend:latest
