## Getting Started

Create a .env.local file with the following template:

```
#Authentication
AUTH_SECRET= #a secret of your choice
AUTH_URL= #example: http://localhost:3000/api/auth 
NEXTAUTH_URL= # example: http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#Database
MONGODB_URI=
MONGODB_COLLECTION=

#AWS S3 Bucket
NEXT_PUBLIC_S3_STATIC_IMG_URL= #example: http://bucketname.s3.eu-central-1.amazonaws.com/images
S3_REGION= #example: eu-central-1
S3_ACCESSKEYID=
S3_SECRETACCESSKEY=
S3_IMGBUCKETNAME=
S3_IMG_SUBFOLDER= #example: /dev

#Application
NEXT_PUBLIC_ALLOWED_IMAGE_EXTENSIONS= #example: jpg,png,ico
NEXT_PUBLIC_ALLOWED_IMAGE_SIZE= #in byte
ITEMS_PER_PAGE= 
PUBLISHER_HASH=
```

