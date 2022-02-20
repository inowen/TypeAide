#!/bin/bash

# Wait for db to initialize
output=$(mongo --host mongodb --eval "db.adminCommand({listDatabases:1})")
grp=$(echo $output | grep "Error");
while [[ ! -z $grp ]];
do
    sleep 1
    echo "Re-attempting connection"
    output=$(mongo --host mongodb --eval "db.adminCommand({listDatabases:1})")
    grp=$(echo $output | grep "Error");
done
echo "Connected!"

# If the db is empty, initialize it
if [[ $(echo $output | grep '"name" : "typeaide"') == "" ]]; then
    echo "The db is empty, checking for default content folder";
    # Check if there is something in the default folder, otherwise exit
    if [[ $(ls /app/default_content | wc -l) == "0" ]]; then
        echo "The default content folder is empty, aborting initialization script"
        exit 1;
    fi;
    echo "Default content folder exists and isn't empty."
    echo "Using mongorestore on default content folder."
    mongorestore --host mongodb /app/default_content
else 
    echo "Typeaide database already present, not initializing."
fi;
