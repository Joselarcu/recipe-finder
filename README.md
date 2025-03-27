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