import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

import prisma from './prisma';

const todos: Prisma.TodoCreateInput[] = [
    {
        text: 'Read a book',
        completed: false,
    },
    {
        text: 'Buy groceries',
        completed: true,
    },
    {
        text: 'Go for a walk',
        completed: false,
    },
    {
        text: 'Clean the house',
        completed: false,
    },
];

async function main() {
    const password = await hash('password', 10);

    const user: Prisma.UserCreateInput = {
        email: 'root@mail.com',
        password,
        emailVerified: new Date(),
    };

    //Clear the database
    await prisma.todo.deleteMany();
    console.log('Database cleared');

    //Seed the database
    console.log('Seeding database...');
    for (const todo of todos) {
        await prisma.todo.create({
            data: todo,
        });
    }

    await prisma.user.upsert({
        where: { email: user.email as string },
        update: user,
        create: user,
    });
    console.log('Database seeded');
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
