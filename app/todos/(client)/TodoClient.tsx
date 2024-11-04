'use client';
import Link from 'next/link';
import { FC, useState } from 'react';

import { addTodo, deleteTodo, updateTodo } from '@/app/todos/action';
import { TodosLoaderRsp } from '@/app/todos/loader';

interface TodoClientProps {
    todos: TodosLoaderRsp;
}

const TodoClient: FC<TodoClientProps> = ({ todos }) => {
    const [todoInput, setTodoInput] = useState<string>('');

    const onClickAdd = async () => {
        await addTodo(todoInput);
        setTodoInput('');
    };

    return (
        <div className="mx-auto flex min-h-screen w-full flex-col">
            <Link href="/">
                {/*Put it on top left*/}
                <p className="ml-8 mt-8 cursor-pointer self-start justify-self-start text-blue-600 underline">
                    Go back
                </p>
            </Link>
            <div className="mx-auto w-1/3 justify-self-center">
                <h1 className="mb-6 text-center text-3xl font-bold">Todo List</h1>
                <div className="mb-4 flex">
                    <input
                        type="text"
                        className="flex-grow rounded-l-md border px-3 py-2 text-black focus:outline-none"
                        placeholder="Add a new todo"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                    />
                    <button
                        onClick={onClickAdd}
                        className="rounded-r-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none"
                    >
                        Add
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
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoClient;
