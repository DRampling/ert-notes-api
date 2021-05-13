# ERT-Notes-API

REST API for ERT note generation

## Setup

Project was created using versions:

- Node: v14.16.1
- Npm: 6.14.12

Clone the project: `git clone https://github.com/DRampling/ert-notes-api.git`<br>
Install dependencies: `cd ert-notes-api && npm install`<br>
Generate keys: `npm run generate-certificates`<br>
Start the project: `npm run start`

## Tests

Tests can be run once with coverage: `npm run test`<br>
Tests can be run every change: `npm run test-dev`<br>
Generate coverage report: `npm run test-coverage`

## Scripts

`generateKeyPair` can be used to generate a pair of certificates required for JWT validation: `npm run generate-certificates`<br>
`generateSaltAndHash` can be used to generate a random salt and hash for the provided password: `npm run generate-salt-and-hash <my_password>`
