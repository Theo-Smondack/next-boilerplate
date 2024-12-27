import { Prisma, PrismaClient } from '@prisma/client';

// Init new prisma client
const prismaSeedClient = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

const defaultUser: Prisma.UserCreateInput = {
    email: 'root@mail.com',
    password: '$2y$10$j3FXQQi5PG5ikg8WDvZ7zeJmU4dITSOqmsRHajElfWcci/moNuJ.q', // == root
};

const todos: Prisma.TodoCreateInput[] = [
    {
        text: 'Read a book',
        completed: false,
        user: {
            connect: { email: defaultUser.email },
        },
    },
    {
        text: 'Buy groceries',
        completed: true,
        user: {
            connect: { email: defaultUser.email },
        },
    },
    {
        text: 'Go for a walk',
        completed: false,
        user: {
            connect: { email: defaultUser.email },
        },
    },
    {
        text: 'Clean the house',
        completed: false,
        user: {
            connect: { email: defaultUser.email },
        },
    },
];

async function main() {
    const existingTodos = await prismaSeedClient.todo.findMany();
    if (existingTodos.length > 0) {
        await prismaSeedClient.todo.deleteMany();
        console.log('Database cleared');
    }

    //Seed the database
    console.log('Seeding database...');
    await prismaSeedClient.user.upsert({
        where: { email: defaultUser.email },
        update: {
            password: defaultUser.password,
        },
        create: defaultUser,
    });

    for (const todo of todos) {
        await prismaSeedClient.todo.create({
            data: todo,
        });
    }
    console.log('Database seeded');
}
main()
    .then(async () => {
        await prismaSeedClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaSeedClient.$disconnect();
        process.exit(1);
    });
