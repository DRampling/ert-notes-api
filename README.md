# ERT-Notes-API

REST API for ERT note generation

## Setup

Project was created using versions:

- Node: v14.16.1
- Npm: 6.14.12

For a fresh install:

- Clone the project: `git clone https://github.com/DRampling/ert-notes-api.git`<br>
- Install dependencies: `cd ert-notes-api && npm install`<br>
- Generate keys: `npm run generate-certificates`<br>
- Create an .env file and populate it with the required details.
- Start the project: `npm run start`

## Tests

There are various scripts to cover testing and coverage:

- Tests can be run once with coverage: `npm run test`<br>
- Tests can be run with every change: `npm run test-dev`<br>
- Coverage report files can be generated: `npm run test-coverage`

## Scripts

There are various scripts to assist setup:

- **generateKeyPair.js** can be used to generate a pair of certificates required for JWT validation:<br> `npm run generate-certificates`
- **generateSaltAndHash.js** can be used to generate a random salt and hash for the provided password:<br> `npm run generate-salt-and-hash <my_password>`
