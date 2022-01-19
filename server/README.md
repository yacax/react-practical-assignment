# services

How to run:
1. pull
2. npm install
3. add local/env data
4. run mongo db
5. import branches/services
6. npm start

How to add local/env data:
- .env
APP_PORT = 8080
APP_HOST = 'localhost'
DB_CONNECTION = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

How to import branches/services:
1. Add local-data/import-dala.js file with array of branches/services. Like this:
module.exports.data = [
	{
		"name": "fruints",
		"services": [
			{
				"_id": "615890950d94ca65f11570a3",
				"branch": "615890950d94ca65f115709e",
				"name": "apple",
				"translates": {
					"ru": "s1_ru111",
				},
			},
			{
				"_id": "615890950d94ca65f11570a5",
				"branch": "615890950d94ca65f115709e",
				"name": "banana",
				"translates": {
					"ru": "s2_ru111"
				},
			}
		],
		"translates": {
			"ru": "b1_ru111",
		},
	}
]
2. Run script: node ./scripts/import-services.js
3. You can edit existing branches/services if needed

How to edit existing branches/services:
1. Run script: node ./scripts/export-services.js
2. Took array of branches/services from local-data/export-dala.js
3. Put this data into local-data/import-dala.js. Like this:
module.exports.data = [<data>]
4. Edit names and/or translations and/or add new branches/services
5. Run script: node ./scripts/import-services.js

