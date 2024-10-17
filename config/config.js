import dotenv from 'dotenv';
dotenv.config();

// Para que vercel acceda a nuestra carpeta public
import path from 'path';
export const __dirname = path.resolve();

export const PORT = process.env.PORT || 5000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

export const URL = `${DOMAIN}:${PORT}`;

export const DB = process.env.MONGO_URI;

export const JWT_SECRET = process.env.JWT_SECRET || "utiliza_otra_clave_segura_no_esta"

