import { Secret } from "jsonwebtoken";

export {};

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            SECRET: Secret | GetPublicKeyOrSecret;
            EXPIRATION: string;
            MONGODB_URI: string | undefined;
            PORT: number;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}