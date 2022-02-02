# Create date string
date_str=$(date +%Y_%m_%d_%H_%M_%S)

# Create the folder
foldername=$(echo $date_str)_backup
echo "Saving to folder named $foldername (format is Y_M_D_Hour_Min_Second)."
docker exec -i typinglite-mongodb-1 mkdir /backups/$foldername

# Dump to that folder (if there's no typinglite db, the folder stays empty)
docker exec -i typinglite-mongodb-1 mongodump -d typinglite -o /backups/$foldername