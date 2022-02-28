# _A simple Daily Blog Website_

> In this project i'm using EJS - a templating library to generate HTML markup with plain Javascript. For database i'm using mongoDB and Styling with Bootstrap.

## Installation

Step 1. In the project directory, you can run:

```sh
npm install
```

Step 2. IMPORTANT:

> You must Create a New File in the project directory "nodemon.json" in order to connect to YOUR OWN MongoDB Online. In this file include the following lines:

```sh
{
	"env": {
		"DB_USER": "YOUR_MONGO_DB_USER_NAME",
		"DB_PASSWORD": "YOUR_MONGO_DB_PASSWORD",
		"DB_NAME": "blogWebsiteDB"
	}
}
```

## Usage

```sh
nodemon app.js
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:3000
```

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
