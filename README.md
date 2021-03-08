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

## Architecture:

I have implemented the application following hexagonal architecture, separating logic by layers (infrastructure, application and domain).

- Infrastructure (data persistence) - src/repositories/
- Application (use cases) - src/features/
- Domain (entities, domain objects) - src/models/

_Each of these directories we would separate by concepts (in our case only `beers`)._

This allows us to modify outer layers without affecting the inner ones, also makes easier to test parts of our code (each component will have a single responsibility and will be decoupled from the rest).

> As we can see in the project, change to show only saved beers is trivial, it is only necessary to change the repository that is being used.
> ([beersRepository.ts](https://github.com/miguel-ra/citibeer/blob/master/src/repositories/beers/beersRepository.ts))

To decouple even more the view from the model I have implemented MVVM pattern, which through a view model ([beerViewModel.ts](https://github.com/miguel-ra/citibeer/blob/master/src/features/beers/beerViewModel.ts)) manages the access to the model. This is very interesting because it allows us to parse and compute data that is going to use in the view.

## Libraries:

- **Router:** I have not used it because I don't think it is necessary as we only show a list and a modal for the detail view.
- **Styles:** I have used Sass modules, to define components scope styles. I have decided to use this library because the theme do not change according to the user's preferences.
- **HTTP client:** I have decided to use Fetch API because the requirements are very simple (we don't need to intercept request or attach cookies to the requests)

## TODOs:

### Improve functionality

- Button to scroll to top if user has scrolled down
- Add more options to filter beers (abv, yeast ...)
- Save selected filters and view mode so that they still selected after page reload
- Make back button on mobile close the modal instead of exiting the application

### Test performance

I have not detected any performance issues, but it would like to spend some time testing it and see if unnecessary rerenderings are taking place.

### Add functional tests

Some of the tests I would like implement:

- Check if beers are loaded when scrolling down.
- Check if the beers list is updated after save beer and close modal.
- Check if saved beers are shown when 'only show saved' is checked
- Check if after reloading the page, saved beers still saved

### Add E2E tests

This is related to the previous point, to do this, one option would be to mock network calls but personally I don't think this is interesting because if the backend fails we would have to check what is going on. (if we mock the server it wouldn't be a E2E test)

I would only mock edge cases that are difficult to replicate.
