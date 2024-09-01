import { APIGatewayProxyResult } from 'aws-lambda';
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
