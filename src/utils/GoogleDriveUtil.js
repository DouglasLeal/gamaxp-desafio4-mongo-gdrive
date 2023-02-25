import dotenv from "dotenv";
import { google } from 'googleapis';
import { Readable } from "stream";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pastaRaiz = path.join(__dirname, "../..")
let KEY_FILE = `${pastaRaiz}/google-api-credentials.json`;

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/drive']
});

const driveService = google.drive({
    version: 'v3',
    auth
});

class GoogleDriveUtil {
    static async criarArquivoCredenciais() {

        if (!fs.existsSync('google-api-credentials.json')) {
            const credentials = {
                type: 'service_account',
                project_id: process.env.GOOGLE_PROJECT_ID,
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
                auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                token_uri: 'https://oauth2.googleapis.com/token',
                auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
                client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
            };

            fs.writeFileSync(
                'google-api-credentials.json',
                JSON.stringify(credentials, null, 2)
            );
        }
    }

    static async uploadImage(imagem) {
        const DRIVE_FOLDER_ID = "18lNSWwpRVNVLAbHYyTC1jbk14Jtvt4Xx";

        const fileMetaData = {
            'name': `${Date.now()}_${imagem.originalname}`,
            'parents': [DRIVE_FOLDER_ID]
        }

        const media = {
            mimeType: imagem.mimeType,
            body: Readable.from(imagem.buffer)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        return response.data.id;
    }

    static async deleteImage(fileId) {
        return await driveService.files.delete({ fileId });
    }


}

export default GoogleDriveUtil;