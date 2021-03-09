# Citibeer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

Using this API [https://punkapi.com/documentation/v2](https://punkapi.com/documentation/v2) the application should:

- Show beers list
- Filter beers by name and first brewed date
- Have beer detail view
- Use emojis to represent abv values
- **Extra 1**: Have a option to save beers and show only saved beers
- **Extra 2**: Show beers grid

## Demo

You can try it [here](https://miguel-ra.github.io/citibeer/).

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) in the folder of the project to install dependencies.

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

```bash
npm start
```

```bash
npm test
```

```bash
npm build
```

## Architecture

I have implemented the application following hexagonal architecture, separating logic by layers (infrastructure, application and domain).

- Infrastructure (data persistence) - src/repositories/
- Application (use cases) - src/features/
- Domain (entities, domain objects) - src/models/

_We would create subdirectories by concepts in each of these directories (in our case we only have `beers`)_

This allows us to modify extenal layers without affecting the internal ones, also makes easier to test parts of our code (each component will have a single responsibility and will be decoupled from the rest).

> As we can see in the project, change to show only saved beers is trivial, it is only necessary to change the repository that is being used.
> ([beersRepository.ts](https://github.com/miguel-ra/citibeer/blob/master/src/repositories/beers/beersRepository.ts))

To decouple even more the view from the model I have implemented MVVM pattern, which through a view model ([beerViewModel.ts](https://github.com/miguel-ra/citibeer/blob/master/src/features/beers/beerViewModel.ts)) manages the access to the data model. This is very interesting because it allows us to parse and compute data that is going to use in the view.

## Libraries

- **Routing:** I have not used it because I don't think it is necessary as we only show a list and a modal for the detail view.
- **Styles:** I have used Sass modules, to define scope styles for components. I have decided to use this library because I like to have the posibility to copy styles from browser to the code and because the theme do not change according to the user's preferences.
- **HTTP requests:** I have decided to use Fetch API because the requirements are very simple (we don't need to intercept request, attach cookies to the requests or have a complex error handler)
- **State management:** I always try to have the state where it is needed, for this application we would need to store the beer view options and the beer list. I have used the Context API to store the beer view options in the view layer because I think the data has to be where it is needed and I don't find it interesting to add a global state manager like redux to manage this kind of data. One of the reasons to use redux would be to store the list of beers, the same Is this list going to be needed in other parts of our application? I don't think so and this is why I don't store the beer list globally (I'm using react-query to handle cache, background updates and stale data).

## TODOs

### Improve functionality

- Button to scroll to top if user has scrolled down
- Add more options to filter beers (abv, yeast ...)
- Save selected filters and view mode so they still selected after page reload
- Make back button on android close the modal instead of exiting the application

### Test performance

I have not detected any performance issues, but it would like to spend some time testing it and see if unnecessary rerenderings are taking place.

### Add functional tests

Some of the tests I would like implement:

- Check if beers are loaded when scrolling down.
- Check if the beers list is updated after save beer and close modal.
- Check if saved beers are shown when 'only show saved' is checked
- Check if after reloading the page, saved beers still saved

### Add E2E tests

Related to the previous test cases, one option would be to mock network calls but personally I don't think it interesting because if backend fails we would have to check what is going on. (if we mock the server it wouldn't be E2E testing)

I would only mock edge cases that are difficult to replicate.
