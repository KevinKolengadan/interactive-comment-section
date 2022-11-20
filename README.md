# Interactive Comment Section

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.
Following features are implemented in this project:
1. Create, Read, Update, and Delete current users comments and replies
2. Upvote and downvote comments
3. Using LocalStorage to store data including the current state in the browser
4. Using current timestamps instead of `createdAt` date string from `data.json`
5. Unit Testing for the Message Component. Complete unit testing is not implemented due to time constraints.
6. Using Angular Material for UI components
7. First-level comments should be ordered by their score (highest score first).
8. Nested replies are ordered by time added.
9. Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
10. A confirmation modal should pop up before a comment or reply is deleted.
11. Adding a new comment or reply uses the `currentUser` object.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
