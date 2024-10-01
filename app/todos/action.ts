'use server';
import { revalidatePath } from 'next/cache';

import prisma from '@/prisma/prisma';

export async function addTodo(text: string) {
    await prisma.todo.create({
        data: {
            text,
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
