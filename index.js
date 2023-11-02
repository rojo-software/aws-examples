export const handler = async(event) => {

    let response = {
        "isAuthorized": false
    };

    // Key value store with username index
    const credentialsDictionary = JSON.parse(process.env.CREDENTIALS);
    const authHeader = event.headers?.authorization;

    const b64Credentials = authHeader.match(/^Basic\s(.*)$/)[1];
    const username = atob(b64Credentials).split(":")[0];
    const password = atob(b64Credentials).split(":")[1];

    if (credentialsDictionary[username] && credentialsDictionary[username].password === password) {
        response.isAuthorized = true;
    }

    console.log(response);

    return response;
};