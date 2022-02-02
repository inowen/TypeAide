# MongoDB Database

## Initialization
A second docker container spins up when using docker-compose, connects to the main container until it gets a response, and checks if the typinglite database exists.
If not, it'll restore it from the default_content folder.

The default_content folder contains a mongodump archive, mongorestore is used to load that into the database.

## Backups 
The mongodump tool is used for backups. The script make_backup.sh (requires a user with docker access, or using sudo) creates an archive in the backups/ folder. Its name is Year_Month_Day_Hour_Minute_Second_backup. 

Use make_backup.sh to create backups.

## Restoring the db's state to that of a certain backup
Delete the db-data folder (mongo will automatically recreate it), empty the default_content folder, and copy the contents of any backup folder (mongodump) into default_content. 
At the next rebuild (docker-compose up --build), the default_content dump will automatically be used to initialize the DB.

