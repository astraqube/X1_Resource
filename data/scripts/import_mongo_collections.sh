#!/bin/bash
DB=test
USER=
PASS=
HOST=localhost:27017
COLLECTIONS=("Currency")

bulk_insert(){
  for collection in ${COLLECTIONS[@]}
  do
      mongoimport --host $HOST --db $DB --collection $collection --drop --file ../samples/$collection.json --jsonArray
      #mongoimport --username $USER --password $PASS --host $HOST --db $DB --collection $collection --drop --file ../samples/$collection.json --jsonArray
      echo ""
      echo "Bulk Insert done for collection " $collection
      echo ""
  done
}


#Invoking Bulk Insert
bulk_insert
