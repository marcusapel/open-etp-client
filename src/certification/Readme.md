# Energistics Transfer Protocol (ETP) Server Certification

This code can be used to certify a server implementation of the Energistics Transfer Protocol (ETP) against the ETP Server conformance test suite.

## Prerequisites

### Using Native OS

- Node.js >=16 <19 available from [Node.js](https://nodejs.org/en/download/)
- NPM >=6.13 <10 available from [Node.js](https://nodejs.org/en/download/)

### Using Docker

- Docker >=19.03 available from [Docker](https://docs.docker.com/get-docker/)

## Installation and Run

### Install Using Native OS

1. Clone this repository to your local machine using `git clone https://community.opengroup.org/osdu/platform/domain-data-mgmt-services/reservoir/open-etp-client.git`
2. Run `npm install` in the root directory of the repository
3. Run `npm run build` in the root directory of the repository
4. Run `npm run certification <config_file.json>` in the root directory of the repository, this will run the certification the server and options described in the configuration file.

### Install Using Docker

1. Install Docker from [Docker](https://docs.docker.com/get-docker/) if not already installed
2. Run `docker pull community.opengroup.org:5555/osdu/platform/domain-data-mgmt-services/reservoir/open-etp-client/certification-open-etp-client-main` to pull the latest version of the certification image
3. Rename the docker image with a shortname using `docker tag community.opengroup.org:5555/osdu/platform/domain-data-mgmt-services/reservoir/open-etp-client/certification-open-etp-client-main etp-certification`
4. Run `docker run -v .:/options -it etp-certification /options/<config_file.json>` to run the certification using the parameters defined in a local `<config.json>` file.

### Configuration

Example of JSON configuration file are available in the `src\certification\` directory and have the json extension.

The configuration file is a JSON object with at least the following properties:

- etpServerUrl: Valid URL of the ETP server to test
- jwtToken: Valid JWT token to use for authentication

Optional properties are:

- supportTransportAuthorization: Boolean indicating if the server supports transport authorization, default true
- supportApplicationAuthorization: Boolean indicating if the server supports application authorization, default true
- serverRequiresAuthorization: Boolean indicating if the server requires authorization, default true

Here's an example of a JSON configuration file:

```json
{
  "etpServerUrl": "https://myserver.com/etp/v12",
  "jwtToken": "exValueOfTheToken",
  "supportTransportAuthorization": true,
  "supportApplicationAuthorization": true,
  "serverRequiresAuthorization": true,

  "protocols": {
    "discovery": {
      "supported": "Boolean:  If Discovery is supported or not"
    },

    "store": {
      "supported": "Boolean:  If Store Protocol is supported or not",
      "supportsWrite": "Boolean:  If server supports write plus delete"
    }
  }
}
```

## Contributing

This requires the installation in your native OS (See above)

### Adding a new test

- Add a new file to the `src\certification\` directory, the file should have the extension `.cert.ts`
- Example of such a file is coreProtocol.test.ts

### Creating the docker image

- Build the executable using `npm run build`
- Run `npm run docker:build:certification` in the root directory of the repository

## Generating JSON example files

In order to generate the JSON example files from XML files, you can use the following command:

```bash
npm run certification:examples
```

This will generate the JSON files from the XML files in `data/examples` directory. These files will be generated in the `data/examples/json` directory.
