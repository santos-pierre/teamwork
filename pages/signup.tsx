import Router from 'next/router';
import { FormEvent, useState } from 'react';
import RegisterLayout from '../components/layouts/Register';
import InputAuth from '../components/ui/InputAuth';

type FormErrors = {
    email?: string[];
    name?: string[];
    password?: string[];
};

const SignUpPage = () => {
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({});
        let formData = new FormData(event.currentTarget);
        let userData: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            setErrors(data.errors);
        } else {
            Router.push('/signin');
        }
    };

    return (
        <RegisterLayout title="Create your account">
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
                    label="Name"
                    id="name"
                    placeholder="John Doe"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    error={errors.name?.shift()}
                />
                <InputAuth
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    error={errors.password?.shift()}
                />
                <InputAuth
                    label="Password Confirmation"
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                />
                <button
                    type="submit"
                    className="group relative w-full shadow-sm flex justify-center py-1.5 px-4 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                    Sign up
                </button>
            </form>
        </RegisterLayout>
    );
};

export default SignUpPage;
