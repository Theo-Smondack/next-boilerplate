import { PrismaClient } from '@prisma/client';

// Init new prisma client
const prismaSeedClient = new PrismaClient({
    datasourceUrl: process.env.DATABASE_SEED_URL,
});

async function main() {
    //Clear the database
    await prismaSeedClient.todo.deleteMany();
    console.log('Database cleared');

    //Seed the database
    console.log('Seeding database...');
    await prismaSeedClient.todo.create({
        data: {
            text: 'Read a book',
            completed: false,
        },
    });
    await prismaSeedClient.todo.create({
        data: {
            text: 'Buy groceries',
            completed: true,
        },
    });
    await prismaSeedClient.todo.create({
        data: {
            text: 'Go for a walk',
            completed: false,
        },
    });
    await prismaSeedClient.todo.create({
        data: {
            text: 'Clean the house',
            completed: false,
        },
    });
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
