# 3.js-first-app

<br />
<img src="" alt="3.js first app" width="800">
<br />

---

# Table of Contents <a name="tableOfContents"></a>

1. [Introduction](#introduction)

2. [Run the project locally](#runLocally)

3. [Deployment](#deployment)
	- [Deployment – Run locally](#deploymentRunLocally)
	- [Deployment – Live website](#deploymentLiveWebsite)

---

## Introduction <a name="introduction"></a>

### Deployment - Live Website

[3.js first app]() live website is currently deployed on [Firebase](https://firebase.google.com/) using the master branch on GitHub. Once you have the project setup locally, you can proceed to deploy it remotely.

1. Create Firebase Account to Deploy Angular Application
Go to [Firebase website](https://firebase.google.com/) login using your email id. Click on the Add project button and create a Firebase app.

2. Install the Firebase Tools using Firebase CLI
    
    Setup Firebase tools globally by the following command
    ````
    npm install -g firebase-tools

    ````

3. Login and Initialize Firebase project using Firebase CLI

    3.1. Login to Firebase project.
    ````
    firebase login
    ````
    3.2. Initialize your Firebase project
    ````
    firebase init
    ````

    Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
    Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default
    Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:
    three-js-first-app
    What would you like to call your project? (defaults to your project ID)

    It seems like you haven’t initialized Realtime Database in your project yet. Do you want to set it up? Yes
    Please choose the location for your default Realtime Database instance: europe-west1
    What file should be used for Realtime Database Security Rules? (database.rules.json)
    What do you want to use as your public directory? dist/3.js-first-app
    Set up automatic builds and deploys with GitHub? Yes
    For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) sctlcd/3.js-first-app
    Set up the workflow to run a build script before every deploy? Yes
    What script should be run before every deploy? (npm ci && npm run build)
    Set up automatic deployment to your site's live channel when a PR is merged? Yes
    What is the name of the GitHub branch associated with your site's live channel? main


Back to [top](#tableOfContents)

---

## Run the project locally <a name="runLocally"></a>

### Node.js five-server

Development server with live reload capability. 

- To install:

    ```
    # Remove live-server (if you have it)
    npm -g rm live-server

    # Install five-server
    npm -g i five-server

    # Update five-server (from time to time)
    npm -g i five-server@latest
    ```

- To run (from your local directory):

    ```
    five-server . -p 8000
    ```

- Plugins for popular code editors
Some code editors have plugins which will spawn a simple server on demand.

    - [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) for Visual Studio Code.
    - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code.
    - [Live Server](https://atom.io/packages/atom-live-server) for Atom.

Back to [top](#tableOfContents)

---

## Deployment <a name="#deployment"></a>

Back to [top](#tableOfContents)

---