'use client';
import Link from 'next/link';
import { useState } from 'react';

interface Todo {
    text: string;
    completed: boolean;
}

const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');

    const addTodo = () => {
        if (todoInput.trim() !== '') {
            setTodos([...todos, { text: todoInput, completed: false }]);
            setTodoInput('');
        }
    };

    const toggleComplete = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
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
                        onClick={addTodo}
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
                                onClick={() => toggleComplete(index)}
                                className={`cursor-pointer ${todo.completed && 'text-green-500'}`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => deleteTodo(index)}
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

export default TodoPage;
