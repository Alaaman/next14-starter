import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({ providers: [ 
    Github({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }), 
],
});