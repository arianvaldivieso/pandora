#!/bin/bash

while [[ $# > 0 ]]  # Itero sobre la cantidad de parametros que se ingresaron.
do
    case "$1" in
        --env | --enviroment )
            shift  
            declare env="$1"  
            shift  
        ;;
        
        * ) 
            shift
        ;;
    esac        
done 

# Ahora ya puedes usar los parametros por nombre.

echo "ENV: $env"

if [[ "$env" != "dev" && "$env" != "prod" ]]; then
	echo "environment << $env >> does not exist"
	exit
fi

fail="1"

echo "Building and upload WIZER"

if [[ "$env" == "prod" ]]; then
    distributionId="EYO72KU2X3Y8V"
    bucket="s3://wizerplatform.com/"
    echo ng build --prod
    ng build --prod
else
    distributionId="E1NQXLFRNZ2OYD"
    bucket="s3://development.wizerplatform.com/"
    echo ng build --configuration=dev
    ng build --configuration=dev
fi


fail="$?"


if [[ "$fail" == "0" ]]; then

    echo aws s3 sync ./dist $bucket --profile=wizer
    aws s3 sync ./dist $bucket --profile=wizer

    echo aws cloudfront create-invalidation --distribution-id $distributionId --paths /* --profile wizer
    aws cloudfront create-invalidation --distribution-id $distributionId --paths /* --profile wizer
    
	#rm -R dist 
    echo "UPLOAD COMPLETE"
	echo 'DONE SUCCESS'
else
	echo "FAILED"
fi




          