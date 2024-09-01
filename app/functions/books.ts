import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { badErrorResponse, successResponse } from '../lib/utils';
const logger = new Logger();

export const addBookHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // TODO: add schema validation
    const body = event.body ?? {};
    logger.info(`Successful response from API enpoint: ${event.path}`, body);
    return successResponse(body);
};

export const getBookHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters?.id as string;
    if (!bookId) {
        return badErrorResponse('Missing book id path parameter');
    }
    return successResponse({
        id: bookId,
    });
};
