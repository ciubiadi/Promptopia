'use client';

import Image from "next/image";
import SignInBtn from "./SignInBtn"
import { useSession } from 'next-auth/react';

const UserInfo = () => {
    const { status, data: session} = useSession();

    if(status === 'authenticated'){
        return ( 
            <div className="shadow-xl p-8 rounded-md flex flex-col gap-3">
                <Image
                className="rounded-full"
                    src={session?.user?.image}
                    // src="/assets/images/logo.svg"
                    alt="User Info"
                    width={60}
                    height={60}
                />
                <div>
                    Name: <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    Email: <span className="font-bold">{session?.user?.email}</span>
                </div>
            </div>
        );
    } else {
        return <SignInBtn />
    }
}

export default UserInfo