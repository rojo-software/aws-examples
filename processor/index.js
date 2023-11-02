const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const validatePayload = require('./validatePayload');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

async function handlePostRequest(eventBody) {
    try {
        const jsonPayload = JSON.parse(eventBody);
        if (!validatePayload(jsonPayload)) {
            throw new Error('Payload not valid');
        }

        await docClient.send(
            new PutCommand({
                TableName: tableName,
                Item: jsonPayload,
            })
        );
        console.log(`Put item ${jsonPayload.id}`);
    }
    catch(err) {
        console.log(err);
        return false;
    }

}

export const handler = async (event) => {
    let statusCode = 404;

    if (event.requestContext.http.method === "GET" && event.queryStringParameters?.id) {
        console.log('Search for record based on id ' + event.queryStringParameters?.id);
        statusCode = 200;
    }
    else if (event.requestContext.http.method === "POST") {
        const status = await handlePostRequest(JSON.parse(event.body));
        if (status == true) {
            statusCode = 201;
        }
        else {
            statusCode = 400;
        }
    }
    else if (event.requestContext.http.method === "DELETE" && event.pathParameters?.id) {
        console.log('Delete record ' + event.pathParameters?.id);
        statusCode = 200;
    }

    return {
        statusCode: statusCode
    };
};
