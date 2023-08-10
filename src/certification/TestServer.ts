import jest = require("jest");
import fs = require("fs");

const fileName = process.argv[2];
if (!fileName) {
  // Add usage information

  console.log(`Usage: npm run certification <config_file>

  Perform ETP server certification using a JSON file configuration from.

  Arguments:
    <config_file>   Required. Path to a JSON file containing configuration options.
      File content example:
        {
          "etpServerUrl": "ws(s)://url.to.etp.server",
          "jwtToken": "value of a JWT token",
          "supportTransportAuthentication": true,
          "supportApplicationAuthentication": true,
          "serverRequiresAuthorization": false
        }


  Example:
    npm run certification config.json
  `);

  //exit process with error code
  process.exit(0);
}

if (!fs.existsSync(fileName)) {
  console.log(`File ${fileName} does not exist`);
  process.exit(1);
}

jest.run([
  "certification/.*\\.cert\\.(jsx?|tsx?)$",
  "--testRegex=certification/.*\\.cert\\.(jsx?|tsx?)$",
  "--runInBand",
  "--detectOpenHandles",
  "--collectCoverage=false"
]);
