'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { DEFAULT_LOGOUT_REDIRECT } from '@/routes';

export async function addTodo(text: string) {
    const session = await auth();
    if (!session?.user?.email) {
        redirect(DEFAULT_LOGOUT_REDIRECT);
    }

    const { email } = session.user;
    await prisma.todo.create({
        data: {
            text,
            user: {
                connect: { email },
            },
        },
    });
    revalidatePath('/todos');
}

export async function updateTodo(id: string, completed: boolean) {
    await prisma.todo.update({
        where: {
            id,
        },
        data: {
            completed,
        },
    });
    revalidatePath('/todos');
}

export async function deleteTodo(id: string) {
    await prisma.todo.delete({
        where: {
            id,
        },
    });
    revalidatePath('/todos');
}
