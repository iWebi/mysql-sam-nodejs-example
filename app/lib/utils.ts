import { APIGatewayProxyResult } from 'aws-lambda';
import { AppError } from './types';
import { DEFAULT_RESPONSE_HEADERS } from './constants';
export function badErrorResponse(message?: string): APIGatewayProxyResult {
    message = message ?? 'Bad Request';
    return {
        statusCode: 400,
        body: message,
    };
}

export function successResponse(body: object, statusCode?: number): APIGatewayProxyResult {
    return {
        statusCode: statusCode ?? 200,
        body: JSON.stringify(body),
    };
}

export function isEmpty(value?: string | Array<object> | object): boolean {
    return (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
    );
}

export function internalServerErrorWith(message?: string): AppError {
    return {
        body: message ?? '',
        statusCode: 500,
        statusType: 'Internal Server Error',
    };
}

export function isAppError(error: any): boolean {
    return (
        typeof error === 'object' &&
        error.hasOwnProperty('body') &&
        error.hasOwnProperty('statusCode') &&
        error.hasOwnProperty('statusType')
    );
}

export function exceptionToProxyResponse(error: any): APIGatewayProxyResult {
    if (isAppError(error)) {
        return errorProxyResponse(error as AppError);
    }
    console.error('returning generic exception response due to ', error);
    if (error instanceof Error) {
        return errorProxyResponse(internalServerErrorWith());
    }
    // we should never reach here
    return errorProxyResponse(internalServerErrorWith('Internal Server Error. Please try again later'));
}

export function errorProxyResponse(error: AppError): APIGatewayProxyResult {
    return {
        body: JSON.stringify(error),
        headers: DEFAULT_RESPONSE_HEADERS,
        statusCode: error.statusCode ?? 500,
    };
}
