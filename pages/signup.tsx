import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';
import Layout from '../components/Layout';
import InputAuth from '../components/ui/InputAuth';

type FormErrors = {
    email?: string[];
    name?: string[];
    password?: string[];
};

const SignUpPage = () => {
    const router = useRouter();
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
            router.push('/signin');
        }
    };

    return (
        <Layout title="Create your account">
            <section className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center relative z-0">
                <div className="bg-white lg:py-28 px-4 shadow-md sm:rounded-3xl py-16 lg:px-20 md:h-4/5 lg:w-[624px] sm:w-3/4 w-full sm:py-20 sm:px-10 flex flex-col justify-center z-0 antialiased">
                    <div>
                        <h2 className="mt-6 text-4xl leading-10 font-extrabold text-gray-900">
                            Create your new account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Or
                            <a
                                href="#"
                                className="font-medium text-sm leading-5 text-blue-600 hover:text-blue-500 ml-1"
                            >
                                log in with an existing account
                            </a>
                        </p>
                    </div>
                    <div className="mt-6">
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
                    </div>
                </div>
                <img src="/img/Pattern.svg" className="w-full absolute bottom-0 z-[-1]" />
            </section>
        </Layout>
    );
};

export default SignUpPage;
