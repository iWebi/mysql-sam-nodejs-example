import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
const logger = new Logger();

export const addBookHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const response = {
        statusCode: 200,
        body: event.body!,
    };
    logger.info(`Successful response from API enpoint: ${event.path}`, response.body);
    return response;
}