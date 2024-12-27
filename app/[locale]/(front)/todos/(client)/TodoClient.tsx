'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { addTodo, deleteTodo, updateTodo } from '@/app/[locale]/(front)/todos/action';
import { TodosLoaderRsp } from '@/app/[locale]/(front)/todos/loader';

interface TodoClientProps {
    todos: TodosLoaderRsp;
}

const TodoClient: FC<TodoClientProps> = ({ todos }) => {
    const t = useTranslations('todos');
    const [todoInput, setTodoInput] = useState<string>('');

    const onClickAdd = async () => {
        await addTodo(todoInput);
        setTodoInput('');
    };

    return (
        <div className="mx-auto flex w-full flex-col">
            <Link href="/">
                {/*Put it on top left*/}
                <p className="ml-8 mt-8 cursor-pointer self-start justify-self-start text-blue-600 underline">
                    {t('link.go-back')}
                </p>
            </Link>
            <div className="mx-auto w-1/3 justify-self-center">
                <h1 className="mb-6 text-center text-3xl font-bold">{t('title')}</h1>
                <div className="mb-4 flex">
                    <input
                        type="text"
                        className="flex-grow rounded-l-md border px-3 py-2 text-black focus:outline-none"
                        placeholder={t('input.add-todo.placeholder')}
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                    />
                    <button
                        onClick={onClickAdd}
                        className="rounded-r-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none"
                    >
                        {t('button.add')}
                    </button>
                </div>

                <ul className="list-none">
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className={`my-2 flex items-center justify-between p-2 ${todo.completed && 'line-through'}`}
                        >
                            <span
                                onClick={async () => await updateTodo(todo.id, !todo.completed)}
                                className={`cursor-pointer ${todo.completed && 'text-green-500'}`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={async () => await deleteTodo(todo.id)}
                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 focus:outline-none"
                            >
                                {t('button.delete')}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoClient;
