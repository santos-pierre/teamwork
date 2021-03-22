import { NextApiRequest, NextApiResponse } from 'next';
import Validator from 'validatorjs';

import { PrismaClient } from '@prisma/client';
import { emailAlreadyExist } from '../../../utils/auth';

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

    let data = {
        name,
        email,
        password,
        password_confirmation,
    };

    let rules = {
        name: 'required',
        email: ['required', 'email', 'regex:/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/'],
        password: 'required|min:8|confirmed',
    };

    let validation = new Validator(data, rules);

    if (validation.fails()) {
        return res.status(422).json({ message: 'Unprocessable Entity', errors: validation.errors.all() });
    }

    if (await emailAlreadyExist(email, prisma)) {
        return res.status(422).json({
            message: 'Unprocessable Entity',
            errors: {
                email: ['This email is already taken.'],
            },
        });
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });

    await prisma.$disconnect();

    return res.status(201).json({ message: 'User Created!' });
};

export default handler;
