import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger();
export async function getSecretValue(secretName: string): Promise<string> {
    logger.info(`fetching secret name ${secretName} - ${process.env.AWS_REGION}`);
    const client = new SecretsManagerClient({
        region: process.env.AWS_REGION,
    });
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: 'AWSCURRENT',
            }),
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return response.SecretString!;
    } catch (error) {
        logger.error(`failed to fetch secret ${secretName}`, error as Error);
        throw error;
    }
}
