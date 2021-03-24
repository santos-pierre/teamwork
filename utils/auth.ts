import { PrismaClient, User } from '.prisma/client';
import bcrypt from 'bcrypt';

// Unique Email Error Handler
export const emailAlreadyExist = async (email: string, prismaClient: PrismaClient) => {
    const user = await prismaClient.user.findUnique({
        where: {
            email: email as string,
        },
    });

    return !!user;
};
// Chek if user exist with those credentials
export const credentialsCheck = async (user: User | null, enteredPassword: string, enteredEmail: string) => {
    if (user && user.password) {
        return user.email === enteredEmail && (await bcrypt.compare(enteredPassword, user.password));
    } else {
        return false;
    }
};
