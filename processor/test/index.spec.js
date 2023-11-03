const index = require('../index');

test('POST request', async() => {
    const event = {
        "version": "2.0",
        "routeKey": "POST /document",
        "rawPath": "/document",
        "rawQueryString": "",
        "body": "{\"id\":\"ea9008de-7877-4116-bd04-5ff4ecbec096\",\"name\":\"Allan\",\"age\":27}",
        "headers": {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "authorization": "Basic YW5vdGhlcnRlc3Q6bGV0bWVpbnBsZWFzZQ==",
            "content-length": "0",
            "host": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "postman-token": "3e48e2c8-6782-429a-8f11-80f6cc56b176",
            "user-agent": "PostmanRuntime/7.34.0",
            "x-amzn-trace-id": "Root=1-6542773c-598f2d4023caccd133018fe0",
            "x-forwarded-for": "86.128.9.21",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "requestContext": {
            "accountId": "824701576201",
            "apiId": "a3jp3ewyog",
            "authorizer": {
                "lambda": null
            },
            "domainName": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "domainPrefix": "a3jp3ewyog",
            "http": {
                "method": "POST",
                "path": "/document",
                "protocol": "HTTP/1.1",
                "sourceIp": "86.128.9.21",
                "userAgent": "PostmanRuntime/7.34.0"
            },
            "requestId": "NueRkhndLPEEPBA=",
            "routeKey": "POST /document",
            "stage": "$default",
            "time": "01/Nov/2023:16:05:16 +0000",
            "timeEpoch": 1698854716957
        },
        "isBase64Encoded": false
    };

    await index.handler(event);
})

test('DELETE event', async() => {
    const event = {
        "version": "2.0",
        "routeKey": "DELETE /document/{id}",
        "rawPath": "/document/ea9008de-7877-4116-bd04-5ff4ecbec096",
        "rawQueryString": "",
        "headers": {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "authorization": "Basic YW5vdGhlcnRlc3Q6bGV0bWVpbnBsZWFzZQ==",
            "content-length": "0",
            "host": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "postman-token": "310ce274-c7b5-4d0b-9bab-8a253c9d081b",
            "user-agent": "PostmanRuntime/7.34.0",
            "x-amzn-trace-id": "Root=1-65427749-78f26edf761856412f1563d0",
            "x-forwarded-for": "86.128.9.21",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "requestContext": {
            "accountId": "824701576201",
            "apiId": "a3jp3ewyog",
            "authorizer": {
                "lambda": null
            },
            "domainName": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "domainPrefix": "a3jp3ewyog",
            "http": {
                "method": "DELETE",
                "path": "/document/456",
                "protocol": "HTTP/1.1",
                "sourceIp": "86.128.9.21",
                "userAgent": "PostmanRuntime/7.34.0"
            },
            "requestId": "NueTkhIxrPEEP4Q=",
            "routeKey": "DELETE /document/{id}",
            "stage": "$default",
            "time": "01/Nov/2023:16:05:29 +0000",
            "timeEpoch": 1698854729753
        },
        "pathParameters": {
            "id": "ea9008de-7877-4116-bd04-5ff4ecbec096"
        },
        "isBase64Encoded": false
    }

    await index.handler(event);

})

test('GET event', async() => {
    const event = {
        "version": "2.0",
        "routeKey": "GET /document",
        "rawPath": "/document",
        "rawQueryString": "id=ea9008de-7877-4116-bd04-5ff4ecbec096",
        "headers": {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "authorization": "Basic YW5vdGhlcnRlc3Q6bGV0bWVpbnBsZWFzZQ==",
            "content-length": "0",
            "host": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "postman-token": "d9db4be8-e552-4802-95fe-dc1c8aa2df88",
            "user-agent": "PostmanRuntime/7.34.0",
            "x-amzn-trace-id": "Root=1-65427734-2b31dd1a026c08fe246a86f7",
            "x-forwarded-for": "86.128.9.21",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "queryStringParameters": {
            "id": "ea9008de-7877-4116-bd04-5ff4ecbec096"
        },
        "requestContext": {
            "accountId": "824701576201",
            "apiId": "a3jp3ewyog",
            "authorizer": {
                "lambda": null
            },
            "domainName": "a3jp3ewyog.execute-api.eu-west-2.amazonaws.com",
            "domainPrefix": "a3jp3ewyog",
            "http": {
                "method": "GET",
                "path": "/document",
                "protocol": "HTTP/1.1",
                "sourceIp": "86.128.9.21",
                "userAgent": "PostmanRuntime/7.34.0"
            },
            "requestId": "NueQOg7TrPEEPzQ=",
            "routeKey": "GET /document",
            "stage": "$default",
            "time": "01/Nov/2023:16:05:08 +0000",
            "timeEpoch": 1698854708338
        },
        "isBase64Encoded": false
    }

    await index.handler(event);

})