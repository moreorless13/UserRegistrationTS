import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env')})

interface ENV {
    SECRET: string | undefined;
    EXPIRATION: string | undefined;
    MONGODB_URI: string | undefined;
    PORT: number | undefined;
    NODE_ENV: string | undefined;
    HOST: string | undefined;
    TRANSPORTPORT: number | undefined;
    USER: string | undefined;
    PASS: string | undefined;
}

interface Config {
    SECRET: string;
    EXPIRATION: string;
    MONGODB_URI: string;
    PORT: number;
    NODE_ENV: string;
    HOST: string;
    TRANSPORTPORT: number;
    USER: string;
    PASS: string;
}

const getConfig = (): ENV => {
    return {
        SECRET: process.env.SECRET,
        EXPIRATION: process.env.EXPIRATION,
        MONGODB_URI: process.env.MONGODB_URI,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        NODE_ENV: process.env.NODE_ENV,
        HOST: process.env.HOST,
        TRANSPORTPORT: process.env.TRANSPORTPORT ? Number(process.env.TRANSPORTPORT) : undefined,
        USER: process.env.USER,
        PASS: process.env.PASS
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;