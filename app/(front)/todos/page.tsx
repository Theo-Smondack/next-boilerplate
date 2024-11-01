'use server';

import TodoClient from '@/app/(front)/todos/(client)/TodoClient';
import { loader } from '@/app/(front)/todos/loader';

export default async function TodosPage() {
    const todos = await loader();
    return <TodoClient todos={todos} />;
}
