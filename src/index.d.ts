import { Session } from "next-auth";

export interface SessionData extends Session {
    user: {
        name: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
        username: string;
        accessTokenExpires: number;
    };
    expires: string;
}