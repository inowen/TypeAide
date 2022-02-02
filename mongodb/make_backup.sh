# Create a folder with the current date in ./backups, mongorestore --host mongodb to that folder 
# Step by step.

# Create the date string
date_str=$(date +%Y_%m_%d_%H_%M_%S)

# Create the folder
foldername=$(echo $date_str)_backup
echo "Saving to folder named $foldername (format is Y_M_D_Hour_Min_Second)."
mkdir ./backups/$foldername

# Restore to that folder
mongorestore --host mongodb ./backups/$foldername