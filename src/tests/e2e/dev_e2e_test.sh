#!/bin/bash
# Todo: use test framework to do e2e test.

echo get all heroes
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -X GET http://localhost:3000/heroes

echo
echo 

for i in 1 2 3 4
do 
echo get id $i hero
  curl -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -X GET http://localhost:3000/heroes/$i
  echo 
  echo
done

echo successfully get authenticated heroes

curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Name: hahow" \
     -H "Password: rocks" \
     -X GET http://localhost:3000/heroes
echo
echo 

echo Fail to get authenticated heroes

curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Name: hahow" \
     -H "Password: rock" \
     -X GET http://localhost:3000/heroes
echo
echo 
for i in 1 2 3 4
do 
echo successfully get authenticated id $i hero
  curl -H "Accept: application/json" \
       -H "Content-Type: application/json" \
       -H "Name: hahow" \
       -H "Password: rocks" \
       -X GET http://localhost:3000/heroes/$i
echo
echo 

echo Fail to get authenticated id $i hero
  curl -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Name: hahow" \
  -H "Password: rocksadasda" \
  -X GET http://localhost:3000/heroes/1
echo 
echo
done