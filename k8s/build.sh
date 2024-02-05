#!/bin/bash
kubectl delete -f postgres-secret.yaml 
kubectl delete -f postgres-config.yaml 
kubectl delete -f postgres.yaml 
kubectl delete -f apiapp.yaml
kubectl delete -f redis-config.yaml
kubectl delete -f redis.yaml
kubectl delete -f cronjob.yaml
kubectl delete -f patch.yaml


kubectl apply -f postgres-config.yaml 
kubectl apply -f postgres-secret.yaml 
kubectl apply -f postgres.yaml 
kubectl apply -f redis-config.yaml
kubectl apply -f redis.yaml
kubectl apply -f patch.yaml
kubectl apply -f cronjob.yaml
kubectl apply -f apiapp.yaml