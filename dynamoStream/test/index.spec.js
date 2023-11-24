const index = require('../index');
const {SNSClient, PublishCommand} = require("@aws-sdk/client-sns");
const {mockClient} = require('aws-sdk-client-mock');

const snsMock = mockClient(SNSClient);

const event = {
    Records: [{
        "eventID": "bc13392d012a9e3a4075b61bf245d8a1",
        "eventName": "MODIFY",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "eu-west-2",
        "dynamodb": {
            "ApproximateCreationDateTime": 1700741378,
            "Keys": {
                "id": {
                    "S": "cc9008de-7877-4116-bd04-5ff4ecbec333"
                }
            },
            "NewImage": {
                "name": {
                    "S": "Mary"
                },
                "id": {
                    "S": "cc9008de-7877-4116-bd04-5ff4ecbec333"
                },
                "age": {
                    "N": "24"
                }
            },
            "SequenceNumber": "3228600000000030072138220",
            "SizeBytes": 89,
            "StreamViewType": "NEW_IMAGE"
        },
        "eventSourceARN": "arn:aws:dynamodb:eu-west-2:824701576201:table/aws-example/stream/2023-11-22T17:20:43.751"
    }]
}

beforeAll(() => {
    process.env.SNS_TOPIC_ARN = "arn:aws:sns:eu-west-2:1234:example"

    snsMock
        .on(PublishCommand, {TopicArn: "arn:aws:sns:eu-west-2:1234:example"})
        .resolves(
            { // PublishResponse
                MessageId: "c4dfe2b9-b5fc-47df-869b-0063b431a6d0",
                SequenceNumber: "1",
            }
        );
})

test('Publishes to SNS topic', async () => {

    expect(index.handler(event)).resolves.toEqual([{
        MessageId: "c4dfe2b9-b5fc-47df-869b-0063b431a6d0",
        SequenceNumber: "1",
    }]);
});