// setup provider such as Google Authentication
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
    
            // update session, make sure that I always know which user is currently online
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile, user, account, credentials }) {
            // if(account.provider === 'google'){
                // const {name, email} = user;

            try{
            /* nextjs route = serverless route => this is a Lambda function that opens up only when it gets called
            so every time it gets cold it needs to spin up the server and make a connection to the database.
                This is great because I don't have to keep the server running constantly but I do have to make a 
            connection to the database.
            */ 
                await connectMongoDB();

                // check if a user already exists
                const userExists = await User.findOne({ 
                    email: profile.email
                });

                // if not, create a new user
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })

                    const res = await fetch("http://localhost:3000/api/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: profile.name,
                            email: profile.email,
                            image: profile.picture
                        }),
                        });

                    if(res.ok){
                        // return user;
                        console.log(user);
                    }
                }

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
            // }

            // return user;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
