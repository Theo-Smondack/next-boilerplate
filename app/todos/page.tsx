'use server';

import TodoClient from '@/app/todos/(client)/TodoClient';
import { loader } from '@/app/todos/loader';

export default async function TodosPage() {
    const todos = await loader();
    return <TodoClient todos={todos} />;
}
