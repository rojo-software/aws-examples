const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, DeleteCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const validatePayload = require('./validatePayload');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

async function handlePostRequest(eventBody) {
    try {
        const tableName = process.env.TABLE_NAME;
        const jsonPayload = JSON.parse(eventBody);
        if (!validatePayload(jsonPayload)) {
            throw new Error('Payload not valid');
        }

        console.log('Post ' + jsonPayload.id);
        await docClient.send(
            new PutCommand({
                TableName: tableName,
                Item: jsonPayload,
            })
        );
        console.log(`Completed post item ${jsonPayload.id}`);
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }

}

async function handleDeleteRequest(docId) {
    try {
        console.log('Deleting ' + docId);
        // Ideally check that id is valid UUID
        const tableName = process.env.TABLE_NAME;
        await docClient.send(
            new DeleteCommand({
                TableName: tableName,
                Key: {
                    id: docId,
                },
            })
        );
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

async function handleSearchRequest(docId) {
    try {
        console.log('Searching for ' + docId);
        // Ideally check that id is valid UUID
        const tableName = process.env.TABLE_NAME;
        const response = await docClient.send(
            new GetCommand({
                TableName: tableName,
                Key: {
                    id: docId,
                },
            })
        );
        return response.Item;
    }
    catch(err) {
        console.log(err);
        return;
    }
}

module.exports.handler = async (event) => {
    let statusCode = 404;
    let responseBody;

    if (event.requestContext.http.method === "GET" && event.queryStringParameters?.id) {
        responseBody = await handleSearchRequest(event.queryStringParameters?.id);
        statusCode = responseBody?.id ===  event.queryStringParameters?.id ? 200: 404;
    }
    else if (event.requestContext.http.method === "POST") {
        const status = await handlePostRequest(event.body);
        statusCode = status ? 201: 400;
    }
    else if (event.requestContext.http.method === "DELETE" && event.pathParameters?.id) {
        const status = await handleDeleteRequest(event.pathParameters.id);
        statusCode = status ? 200: 400;
    }

    return {
        body: JSON.stringify(responseBody),
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        }
    };
};