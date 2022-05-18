# Media Scrapper

A distributed pipeline for scrapping image and video over web.

## How to run

For development environment

```bash
docker-compose -f docker-compose.dev.yml up
```

For production environment

```bash
docker-compose up -d
```

## Description

There is an Nginx server on endpoint `localhost:3050` which comprises two different endpoints, one for serving the client on the home route and the other one for backend API on `/api/*`

# Client-side

As you can see on `localhost:3050` I couldn't put much time on client and it just has a text area where you can add urls. but no media scrolling fascinated stuff. sorry for that I prioritize having a well-structured system in a limited time of 5 hours in total.

# Server-side

In the server side, we have a microservice over Redis Stream. there is an api-gateway layer which is responsible for sending request to the scraper microservices and also `/api/media` endpoint that is for fetching media, pagination.

# Testing endpoints

You need to have a Postman.

For sending URLs, a `POST` request to `localhost:3050/api/url/` with following body:

```json
{ "urls": ["https://google.com"] }
```

For fetching the medias a `GET` request to `localhost:3050/api/media?category=image&page=1&size=10`

the category must be of following options:

```javascript
const MediaType = {
  VIDEO: "video",
  IMAGE: "image",
};
```
