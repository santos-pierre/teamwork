import Router from 'next/router';
import { FC, FormEvent, useState } from 'react';
import InputAuth from '../components/ui/InputAuth';
import { signIn, providers } from 'next-auth/client';
import RegisterLayout from '../components/layouts/Register';

type FormErrors = {
    email?: string[];
};

type SignInPageProps = {
    github_provider: any;
};

const SignInPage: FC<SignInPageProps> = ({ github_provider }) => {
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});

        let formData = new FormData(event.currentTarget);
        let userData: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        const res = await signIn('credentials', {
            email: userData.email,
            password: userData.password,
            redirect: false,
        });

        if (res.error) {
            setErrors({ email: [res.error] });
        } else {
            Router.push('/');
        }
    };

    return (
        <RegisterLayout title="Sign in to your account" isLogin>
            <form className="space-y-6" onSubmit={handleSignIn}>
                <InputAuth
                    label="Email"
                    id="email"
                    placeholder="you@example.com"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email?.shift()}
                />
                <InputAuth
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                />
                <button
                    type="submit"
                    className="group relative w-full shadow-sm flex justify-center py-1.5 px-4 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                    Sign in
                </button>
                <button
                    type="button"
                    className="group relative w-full shadow-sm flex justify-center py-1.5 px-4 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-black hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    onClick={() =>
                        signIn(github_provider.id, {
                            callbackUrl: '/',
                        })
                    }
                >
                    Sign in with {github_provider.name}
                </button>
            </form>
        </RegisterLayout>
    );
};

export const getServerSideProps = async () => {
    const nextAuthProviders = await providers();

    return {
        props: {
            github_provider: nextAuthProviders!.github,
        },
    };
};

export default SignInPage;
