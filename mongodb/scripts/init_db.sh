#!/bin/bash

echo "Now calculating the output"
output=$(mongosh --eval "db.adminCommand( {listDatabases:1} )")
echo "This is the output:"
echo $output 



#if mongo databases grep typinglite == 0:
#	mongoImport from default;