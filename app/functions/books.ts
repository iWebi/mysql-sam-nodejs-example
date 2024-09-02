import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { badErrorResponse, exceptionToProxyResponse, successResponse } from '../lib/utils';
import { Book } from '../lib/types';
const logger = new Logger();
import { ulid } from 'ulid';
import { addBook, deleteBookById, getBookById } from '../lib/repository';

export const addBookHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    // TODO: add schema validation
    try {
        const book: Book = JSON.parse(event.body ?? '') as Book;
        book.id = ulid();
        await addBook(book);
        logger.info(`Successful response from API enpoint: ${event.path}`, JSON.stringify(book, null, 2));
        return successResponse(book);
    } catch (err) {
        return exceptionToProxyResponse(err);
    }
};

export const getBookHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters?.id as string;
    if (!bookId) {
        return badErrorResponse('Missing book id path parameter');
    }
    try {
        const response = await getBookById(bookId);
        return successResponse(response);
    } catch (err) {
        return exceptionToProxyResponse(err);
    }
};

export const deleteBookHandler = async (
    event: APIGatewayProxyEvent,
    context: Context,
): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters?.id as string;
    if (!bookId) {
        return badErrorResponse('Missing book id path parameter');
    }
    try {
        const response = await deleteBookById(bookId);
        return successResponse(response);
    } catch (err) {
        return exceptionToProxyResponse(err);
    }
};
