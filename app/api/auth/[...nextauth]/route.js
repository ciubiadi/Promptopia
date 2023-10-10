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
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            console.log('session')
            console.log(session)
    
            // update session, make sure that I always know which user is currently online
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile, user, account, }) {

            console.log('profile');
            console.log(profile);

            console.log('user')
            console.log(user)

            console.log('account')
            console.log(account)

            if(account.provider === 'google'){
                // const {name, email} = user;

                try{
                /* nextjs route = serverless route => this is a Lambda function that opens up only when it gets called
                so every time it gets cold it needs to spin up the server and make a connection to the database.
                    This is great because I don't have to keep the server running constantly but I do have to make a 
                connection to the database.
                */ 
                    console.log('before connect to db');
                    await connectMongoDB();

                    // check if a user already exists
                    const userExists = await User.findOne({ 
                        email: profile.email
                    });
                    console.log('userExists');
                    console.log(userExists);
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

                        console.log('res')
                        console.log(res)

                        if(res.ok){
                            return user;
                        }
                    }
                    return true;
                } catch (error) {
                    console.log(error);
                    console.log('in catch');
                }
            }

            return user;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };