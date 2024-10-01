import prisma from './prisma';

async function main() {
    //Clear the database
    await prisma.todo.deleteMany();
    console.log('Database cleared');

    //Seed the database
    console.log('Seeding database...');
    await prisma.todo.create({
        data: {
            text: 'Read a book',
            completed: false,
        },
    });
    await prisma.todo.create({
        data: {
            text: 'Buy groceries',
            completed: true,
        },
    });
    await prisma.todo.create({
        data: {
            text: 'Go for a walk',
            completed: false,
        },
    });
    await prisma.todo.create({
        data: {
            text: 'Clean the house',
            completed: false,
        },
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
