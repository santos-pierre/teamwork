import { InputHTMLAttributes } from 'react';

type InputAuthProps = {
    label: string;
    id: string;
    error?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

const InputAuth = ({ label, id, error = null, ...rest }: InputAuthProps) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block text-lg leading-6 font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    {...rest}
                    id={id}
                    className={`appearance-none block w-full px-3 py-2 border ${
                        !error
                            ? 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                            : 'border-red-500 placeholder-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                    } rounded-md shadow-sm  focus:outline-none sm:text-sm`}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default InputAuth;
