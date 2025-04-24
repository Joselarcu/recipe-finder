# RecipeFinder

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Development server

To start a local development server:

1. Install dependencies

```bash
npm install
```
2. set environment variables on environment.ts provided in a document send by email.

```bash
ng serve
```

## Important Considerations

1. Make sure you have Node.js installed (version 16 or higher recommended)
2. The application requires an internet connection to work with Firebase. Data is stored in Firestore, so you need to have your Firebase project properly configured with the provided credentials. The Firestore database created for this assessment is for testing purposes, so it will no longer be accessible after 30 days. It already contains some pre-created recipes.
3. I have chosen to use Firestore instead of LocalStorage to make the application more 'realistic without the need for a backend server.
4. I also created a basic form to add more recipes if it's needed
5. I have chosen Bootstrap to easily create a user-friendly design. The recipe detail view is slightly different, and I used Tailwind CSS to style it, along with some Bootstrap components.


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

#execute sonar locally on docker

```bash
docker run -d --name sonar-test -p 9000:9000 sonarqube
```

#docker

create container
```bash
docker-compose build
```

run docker container
```bash
docker-compose up
```

stop docker container
```bash
docker-compose down
```

export docker container
```bash
docker save angular-docker -o angular-docker.tar
```
import docker container
```bash
docker load -i angular-docker.tar
docker run -d -p 4200:80 angular-docker
```

see docker images
```bash
docker images
```

check if a container is running
```bash
docker ps
```

stop docmer container
```bash
docker stop idImage(check it on docker ps)
```