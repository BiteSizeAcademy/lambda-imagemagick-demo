# Instructions

### Create the lambda function

- clone this repo
- install:

   `$ npm i`

- create an archive:

   `$ ./create-archive.sh`

- upload the archive to your lambda function
- add permissions to the role of this function to save files to S3

### Create a layer

- [ImageMagick for AWS Lambda 2](https://github.com/serverlesspub/imagemagick-aws-lambda-2#usage)
- attach the layer to your lambda function