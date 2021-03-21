import { FormEvent, useRef } from 'react';
import Layout from '../components/Layout';

const SignUpPage = () => {
    const emailInput = useRef(null);
    const nameInput = useRef(null);
    const passwordInput = useRef(null);
    const passwordConfirmationInput = useRef(null);

    const handleSignUp = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault();

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: 'John@gmail.com',
                name: 'John Doe',
                password: 'password',
                password_confirmation: 'password',
            }),
        });

        const data = await res.json();

        console.log(data);
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
                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-lg leading-6 font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        placeholder="you@example.com"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        ref={emailInput}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="name"
                                    className="block text-lg leading-6 font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        placeholder="John Doe"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        ref={nameInput}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="password"
                                    className="block text-lg leading-6 font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        placeholder="Password"
                                        ref={passwordInput}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-lg leading-6 font-medium text-gray-700"
                                >
                                    Password Confirmation
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        ref={passwordConfirmationInput}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
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
