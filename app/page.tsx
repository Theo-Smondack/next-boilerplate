import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="mt-4 text-4xl font-bold">Welcome to your new app!</h1>
            <p className="mt-2 text-center text-lg">
                Get started by editing <code>app/page.tsx</code>
            </p>
            <Link href="/todos">
                <p className="mt-4 cursor-pointer text-center text-lg text-blue-600 underline">
                    Go to the Todos page
                </p>
            </Link>
        </div>
    );
}
