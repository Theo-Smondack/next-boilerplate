'use client';

import LoginForm from '@/app/login/(ui)/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = () => {
    return (
        <div className="flex h-screen">
            <Card className="m-auto w-1/6">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
