import { PrismaClient } from '.prisma/client';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { credentialsCheck } from '../../../utils/auth';

const prisma = new PrismaClient();

export default NextAuth({
    session: {
        jwt: true,
    },
    database: process.env.DATABASE_URL,
    providers: [
        Providers.Credentials({
            name: '',
            credentials: {},
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!(await credentialsCheck(user, credentials.password, credentials.email))) {
                    throw new Error('Credentials do not match our record.');
                }
                if (user) {
                    return { email: user.email, image: user.image, name: user.name };
                }

                return null;
            },
        }),
    ],
});
