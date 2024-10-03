'use client';

import { useForm } from 'react-hook-form';

import { LoginAction, LoginData } from '@/app/login/actions';

export default function LoginPage() {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginData) => {
        console.log(values);
        const res = await LoginAction(values);
        console.log(res);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <label>
                    Email
                    <input type="email" {...form.register('email')} />
                </label>
                <label>
                    Password
                    <input type="password" {...form.register('password')} />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
