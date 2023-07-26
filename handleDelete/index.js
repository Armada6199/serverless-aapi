import {
    DeleteCommand,
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
            case 'DELETE /people/{id}':
                await dynamo.send(
                    new DeleteCommand({
                        TableName: tableName,
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                )
                body = `Deleted people: ${event.pathParameters.id}`;
                statusCode=201;
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