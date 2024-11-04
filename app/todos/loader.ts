import { Prisma } from '@prisma/client';

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
    return prisma.todo.findMany({
        select: {
            id: true,
            text: true,
            completed: true,
        },
    });
}
