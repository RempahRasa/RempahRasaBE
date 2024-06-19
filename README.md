# RempahRasaBE

<img src="https://lh3.googleusercontent.com/d/1_NOe8t2XjlvEh3VSbDsDapIt1uRRqnKt"/>

## Introduction

Rempah Rasa BE is an Application Programming Interface that use Representational State Transfer (REST) as the architecture. ALL of the endpoint is used by Rempah Rasa APP. This repository are built by Express.JS using Typescript. For the main feature we are using Tensorflow.JS for consume the model from models that have been created by machine learning team. This repository is focused on being deployed on Google Cloud Platform services, which here use Service accounts, databases with Firestore, and object data storage with Buckets on Cloud Storage.

- Service Architecture

  <img src="https://lh3.googleusercontent.com/d/1Nopx63k1c1OTOhfCBMI3uPXhJDBqhPtc"/>

## Built With

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Clone repository to your local machine by using

```bash
git clone https://github.com/RempahRasa/RempahRasaBE.git
```

- Go to the repository directory

```bash
cd ~/RempahRasaBE
```

- Installing dependencies with Bun

```bash
bun install
```

For service account, you can make some folder named "Secret" and put the json inside the folder.

```bash
/src/secret/<SERVICE-ACCOUNT>.json
```

- Make a copy from `.env.example` then rename it to become `.env` and fill the all of the requirement environment variable.

### Installation

To run this repository for production:

```bash
bun run start
```

To run this repository for development:

```bash
bun run dev
```

To run this repository for with docker:

```bash
docker build -t rempahrasabe .
docker run -d -p 3000:3000 --name rr --restart unless-stopped rempahrasabe
```

## Usage

For using this repository. There is additional documentation for how to consume the API and demos in the Postman for testing.

### Endpoint

POST spice-classification

```url
http://{{base_url}}/prediction
```

### Authorization

Using Bearer Token

#### Token

```
<token>
```

### Body

Using form-data

#### Image

```
<Path_Image>
```

#### Example

##### Request

Success (200)

```
curl --location 'https://{{base_url}}/prediction' \
--form 'image=@"/home/user/Pictures/kunyit.jpg"'
```

##### Response

```json
{
  "data": {
    "id": "c8fe9477-d545-4492-be49-bec944582593",
    "image": "https://storage.googleapis.com/<bucket>/spice-image/53e8a51c-8bca-43a9-8714-3ea062e218b1",
    "result": "kunyit",
    "createdAt": "2024-06-12T06:29:00.369Z"
  }
}
```

For more examples, please refer to the [Documentation](https://documenter.getpostman.com/view/35228443/2sA3Qy6pDx)
