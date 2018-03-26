#!/bin/bash
DB=test
USER=
PASS=
HOST=localhost:27017
COLLECTIONS=("Currency")

bulk_export(){
  for collection in ${COLLECTIONS[@]}
  do
      #mongoexport --db $DB --collection $collection --out ../local-back-up/$collection.json --jsonArray
      mongoexport --username $USER --password $PASS --host $HOST --db $DB --collection $collection --out ../exportes/$collection.json --jsonArray
      echo ""
      echo "Bulk Export done for collection " $collection
      echo ""
  done
}


#Invoking Bulk Export
bulk_export
