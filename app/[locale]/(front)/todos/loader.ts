import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { DEFAULT_LOGOUT_REDIRECT } from '@/config/routes';
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
        redirect(DEFAULT_LOGOUT_REDIRECT);
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
