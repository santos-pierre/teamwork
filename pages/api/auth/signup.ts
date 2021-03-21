import { NextApiRequest, NextApiResponse } from 'next';
import Validator from 'validatorjs';

import { PrismaClient } from '@prisma/client';

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const handler = async ({ method, body }: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();

    if (method !== 'POST') {
        return;
    }

    let { name, email, password, password_confirmation } = JSON.parse(body) as UserForm;

    Validator.registerAsync(
        'email_available',
        async (email, attributes, req, passes) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email as string,
                    },
                });
                if (user) throw new Error('Email already taken');
                passes(true);
            } catch (error) {
                passes(false);
            }
        },
        'The :attribute has already been taken'
    );

    let data = {
        name,
        email,
        password,
        password_confirmation,
    };

    let rules = {
        name: 'required',
        email: ['required', 'email', 'regex:/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/', 'email_available'],
        password: 'required|min:8|confirmed',
    };

    let validation = new Validator(data, rules);

    const passes = async () => {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });
        return res.status(201).json(newUser);
    };

    const fails = () => {
        return res.status(422).json({ message: 'Unprocessable Entity', errors: validation.errors.all() });
    };

    validation.checkAsync(passes, fails);
};

export default handler;
