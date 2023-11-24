const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const client = new SNSClient();

module.exports.handler = async(event) => {

    const topicArn = process.env.SNS_TOPIC_ARN;

    async function processDynamoEvent(record) {
        try {
            const id = record.dynamodb.NewImage.id.S;
            const name = record.dynamodb.NewImage.name.S;

            console.log(`${id} ${name}`);

            const input = { // PublishInput
                Message: `DDB update for ${name} (${id})`,
                TopicArn: topicArn,
                Subject: "Update from AWS"
            };
            const command = new PublishCommand(input);
            const response = await client.send(command);
            console.log(response);
            return response;
        }
        catch(err) {
            console.log(err);
        }
    }

    return await Promise.all(event.Records.map(processDynamoEvent));
}
