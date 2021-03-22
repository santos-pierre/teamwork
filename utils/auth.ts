// Unique Email Error Handler

import { PrismaClient } from '.prisma/client';

export const emailAlreadyExist = async (email: string, prismaClient: PrismaClient) => {
    const user = await prismaClient.user.findUnique({
        where: {
            email: email as string,
        },
    });

    return !!user;
};
