'use server';

import TodoClient from '@/app/[locale]/(front)/todos/(client)/TodoClient';
import { loader } from '@/app/[locale]/(front)/todos/loader';

export default async function TodosPage() {
    const todos = await loader();
    return <TodoClient todos={todos} />;
}
