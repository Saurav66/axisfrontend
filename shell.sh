#! /bin/bash
cd /var/lib/jenkins/workspace/backend/
sudo su - jenkins -s/bin/bash
#docker logout   masternode.mine.com
  docker login -u mineck11 --password ck769184@ hub.docker.com
  docker image build -t  $JOB_NAME:v1.$BUILD_ID .
 docker image tag $JOB_NAME:v1.$BUILD_ID mineck11/gov/$JOB_NAME:v1.$BUILD_ID
 docker image tag $JOB_NAME:v1.$BUILD_ID mineck11/gov/$JOB_NAME:latest
 docker image push mineck11/gov/$JOB_NAME:v1.$BUILD_ID
 docker  push mineck11/gov/$JOB_NAME:latest
 docker image rmi $JOB_NAME:v1.$BUILD_ID  mineck11/gov/$JOB_NAME:v1.$BUILD_ID  mineck11/gov/$JOB_NAME:latest 
