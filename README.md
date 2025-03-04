# zesty-test-matthew-jenkins
Take come coding challenge for Zesty.ai


### Running the Application in Docker:

Start and seed the database
```
docker compose -f './engineering-test-db-setup/docker-compose.yml' up -d
```

Start the application server
```
docker compose -f './express-server/compose.yaml' up -d
```

Navigate to http://localhost:3000 in your browser to view the application.


### To run playwright tests,

```
cd playwright-tests
npm install 
npm test
```

To run tests ui
```
npx playwright test --workers 1 --ui
```


### To run the react-ui development server,
```
cd react-ui
npm install --global yarn
yarn install
yarn dev
```


