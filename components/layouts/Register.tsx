import Link from 'next/link';
import React, { ReactNode } from 'react';
import Base from './Base';

type Props = {
    children?: ReactNode;
    isLogin?: boolean;
    title?: string;
};

const RegisterLayout = ({ children, isLogin = false, title = 'This is the default title' }: Props) => {
    return (
        <Base title={title}>
            <section className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center relative z-0">
                <div className="bg-white lg:py-28 px-4 shadow-md sm:rounded-3xl py-16 lg:px-20 md:h-4/5 lg:w-[624px] sm:w-3/4 w-full sm:py-20 sm:px-10 flex flex-col justify-center z-0 antialiased">
                    <div>
                        <h2 className="mt-6 text-4xl leading-10 font-extrabold text-gray-900">
                            {isLogin ? 'Sign in to your account' : 'Create your new account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or
                            <Link href={isLogin ? '/signup' : '/signin'}>
                                <a className="font-medium text-sm leading-5 text-blue-600 hover:text-blue-500 ml-1">
                                    {isLogin
                                        ? 'create a brand new account'
                                        : 'log in with an existing account'}
                                </a>
                            </Link>
                        </p>
                    </div>
                    <div className="mt-6">{children}</div>
                </div>
                <img src="/img/Pattern.svg" className="w-full absolute bottom-0 z-[-1]" />
            </section>
        </Base>
    );
};

export default RegisterLayout;
