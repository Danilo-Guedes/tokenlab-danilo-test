# tokenlab-danilo-test

This is a test for fullstack developer in TokenLab made in a week, and with more time I will refactor and add more features (probably).

This is a fullstack application built with the fammous MERN STACK. It' is a simulation for an event tracking app, with full authentication, user creation, event creation and edition, validation for event dates overlaping (for user and for guests) and so on...

## Front-end

The front-end of this application is developed using:

- Vite: a fast build tool for modern web development.
- React: a popular JavaScript library for building user interfaces (SPA approach).
- Formik: a library for building forms with React.
- Yup: a schema validation library.
- Tailwind CSS: a utility-first CSS framework.
- React Query: a library for fetching and managing async data in React applications.

## Back-end

The back-end of this application is developed using:

- Node.js: a JavaScript runtime for server-side development.
- Express: a fast and minimalist web application framework for Node.js.
- MongoBD: a NoSql lightweight database.

## Getting Started

> :warning: **WARNING **: This monorepo requires Docker and Docker Compose  installed before proceeding.

To get started with this project, follow the steps below:

1. Clone the repository.

```bash
git clone https://github.com/Danilo-Guedes/tokenlab-danilo-test.git
```

2. cd into the project folder.

```bash
cd tokenlab-danilo-test
```

3. run the docker compose to initiate the application.

```bash
docker-compose up --build
```

4. Open the browser at http://localhost:5173/ (default port for vite apps) and use the application.

## What I would do if I had more time ?

1. Adopt a DDD or Clean Architecture approach to prepare the code for a healthier and growth.
2. As you create the domain entities, make better use of OOP and making sure the core functionalities are not coupled with third party libraries, making sure the code is easier to maintain and easier to test.
3. Write tests for the application.
4. Create a class to standardize backend errors.
5. If it were a real project, I would be using TypeScript instead of vanilla JavaScript.
6. Add better loading states (skeletons and spinners) and of course add small animation to make the UI and UX even more friendly.

## Screenshots

<img src="screenshots/home-desktop.png" alt="Home Desktop Screenshot" width="100%">
<img src="screenshots/empty-events-list.png" alt="Empty Events List Svg" width="100%">
<img src="screenshots/event-form-validation.png" alt="Event Form Validation" width="100%">
<img src="screenshots/datepicker-validation.png" alt="DatePicker Validations"  width="100%" >
<img src="screenshots/event-exclude-modal.png" alt="Event Exclude Modal"  width="100%" >
<img src="screenshots/event-list-desktop.png" alt="Event List Desktop Screenshot"  width="100%" >
<img src="screenshots/user-overlap-toast.png" alt="User Overlap Toast" width="40%">
<img src="screenshots/guest-overlap-toast.png" alt="Guest Overlap Toast" width="40%">
<img src="screenshots/event-list-mobile.png" alt="Event List Mobile Screenshot" width="40%">
<img src="screenshots/event-edition-mobile.png" alt="Event Edition on Mobile" width="40%">
<img src="screenshots/home-mobile.png" alt="Home Mobile Screenshot" width="40%">
<img src="screenshots/user-profile-mobile.png" alt="user Profile Mobile Screenshot" width="40%">

## License

This project is licensed under the [MIT License](LICENSE).
