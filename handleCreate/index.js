import {
    PutCommand,
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
            case 'PUT /people':
                const obj = JSON.parse(event.body)
                await dynamo.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: {
                            id: obj.id,
                            name: obj.name,
                            age: obj.age
                        }
                    }))
                body = `Inserted ${obj.id}`
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