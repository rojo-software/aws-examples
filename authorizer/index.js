const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const client = new SSMClient();

module.exports.handler = async(event) => {

    let isAuthorized = false;

    try {
        const input = {
            Name: "AUTH_CREDENTIALS", // TODO this should come from an env var!
            WithDecryption: true
        };

        const command = new GetParameterCommand(input);
        const response = await client.send(command);
        const credentialsString = response.Parameter.Value;

        // Key value store with username index
        const credentialsDictionary = JSON.parse(credentialsString);
        const authHeader = event.headers?.authorization;

        const b64Credentials = authHeader.match(/^Basic\s(.*)$/)[1];

        const plainCredentials = (Buffer.from(b64Credentials, 'base64')).toString().split(':')

        const username = plainCredentials[0];
        const password = plainCredentials[1];

        if (credentialsDictionary[username] && credentialsDictionary[username].password === password) {
            console.log(`${username} is ${!isAuthorized ? '' : 'not '}authorized`);
            isAuthorized = true;
        }

    }
    catch(err) {
        console.log(error);
    }
    finally {
        return {
            isAuthorized: isAuthorized
        }
    }


};
