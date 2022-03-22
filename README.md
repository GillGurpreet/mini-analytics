# mini-analytics

To run this application, 
- Clone the repository & cd into 'mini-analytics'
- Run **npm install** to install the packages
- Run **npm start** to start the http server & worker

Send a POST request to /ingest-api like so:
```bash 
POST /ingest-api {"experienceID": 1}
```

data1.json will receive experienceID, and the worker will update data2.json with the data as requested.

Update the MINI_ANALYTICS_INTERVAL in the .env file to set the interval at which the worker updates data2.json (default 5 seconds if not specified)
