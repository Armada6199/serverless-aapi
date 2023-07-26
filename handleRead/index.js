import {
    ScanCommand,
} from '@aws-sdk/lib-dynamodb';
export const handler = async (event) => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };
    console.log(event.routeKey);
    try {
        switch (event.routeKey) {
            case 'GET /people':
                body = await dynamo.send(
                    new ScanCommand({ TableName: tableName })
                )
                body = body.Items;
                break;

            case 'GET /people/{id}':
                body = await dynamo.send(
                    new GetCommand({
                        TableName: tableName,
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                )
                body = body.Item;
                break;
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }
    return {
        statusCode,
        body,
        headers
    }

};