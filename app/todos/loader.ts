import { Prisma } from '@prisma/client';

import { auth } from '@/auth';
import prisma from '@/prisma/prisma';

export const todosPrisma = Prisma.validator<Prisma.TodoDefaultArgs>()({
    select: {
        id: true,
        text: true,
        completed: true,
    },
});

export type TodosLoaderRsp = Prisma.TodoGetPayload<typeof todosPrisma>[];

export async function loader(): Promise<TodosLoaderRsp> {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error('Unauthorized');
    }

    const { email } = session.user;

    return prisma.todo.findMany({
        select: {
            id: true,
            text: true,
            completed: true,
        },
        where: {
            user: {
                email,
            },
        },
    });
}
