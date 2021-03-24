import Router from 'next/router';
import { FormEvent, useState } from 'react';
import InputAuth from '../components/ui/InputAuth';
import { signIn } from 'next-auth/client';
import RegisterLayout from '../components/layouts/Register';

type FormErrors = {
    email?: string[];
};

const SignInPage = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
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
            <form className="space-y-6" onSubmit={handleSignUp}>
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
            </form>
        </RegisterLayout>
    );
};

export default SignInPage;
