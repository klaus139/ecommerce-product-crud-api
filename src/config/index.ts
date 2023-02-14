import dotenv from 'dotenv';

if(process.env.NODE_ENV !== "prod"){
    const configFile = `.env.dev`;
    dotenv.config({ path: configFile });
} else {
    dotenv.config();
}

export const PORT = process.env.PORT as string
console.log(PORT)
export const DB_URL = process.env.DB_URL as string
export const APP_secret = process.env.APP_SECRET as string;
