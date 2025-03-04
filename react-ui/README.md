# Engineering Test Fullstack with QA

This is a fullstack application that includes a React UI, Express API, and a Postgres database and playwright.

The application has the following features:

## Feature List

* **List all properties:** Display, in a tabular format, all properties and their geographic location (longitude and
  latitude).

* **Map view:** Implement an interactive map view using Mapbox, initially showing all the properties as pins on the map. This map should be tied to the search functionality (see next feature), and filter the pins based on the search results. Selecting a pin on the map should display the property detail view for that location.

* **Property detail view:** Show detailed information about a given property, including its image, geographic location,
  and statistics (if applicable). This can be either a dedicated page or a popup/info modal in the map view.

* **Search by coordinates:** Prompt the user for a longitude, latitude, and search radius (default 10000 meters) and
  display, in a tabular format, the results of the search, including the properties' geographic location (longitude and
  latitude). Pan the interactive map to the entered location and filter the pins to the returned search results. Also visually indicate the search radius on the map.

Notes: The application does not contain the image overlay feature, due to time constraints. Images in the modal are slow to load
the first time, due to the image being fetched and converted to jpeg, subsequent loads use the saved Blob url. You can't clear
the search and have to refresh the page to clear the search results.

### Running the Application

Start / seed the database
```
docker compose -f './engineering-test-fullstack-with-qa/docker-compose.yml' up -d
```

Start the application
```
docker compose -f './express-server/compose.yaml' up -d
```

Navigate to `http://localhost:3000` in your browser

### Running the Tests

```
cd playwright-tests
npm install
npm test
```

If playwright is not install on your system you may need to run the following command, to add it and browser
dependencies:
```
npx playwright install --with-deps
```

To run the test with the ui, run the following command:
```
npx playwright test --workers=1 --ui
```

## Running the React UI development server

```
cd react-ui
npm install --global yarn
yarn install
yarn dev
```