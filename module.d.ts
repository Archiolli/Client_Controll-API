declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: String;
        jwtSecretKey: string;
        jwtRefreshTokenKey: string;
    }
}