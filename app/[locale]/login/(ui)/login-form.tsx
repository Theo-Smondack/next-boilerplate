import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/app/[locale]/login/action';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getLoginSchema } from '@/schema/login';

const LoginForm = () => {
    const t = useTranslations('login');
    const tLoginError = useTranslations('login.message.error');
    const loginSchema = getLoginSchema(tLoginError);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);
        const res = await login(formData);
        if (res?.error) {
            toast({
                title: res.error,
                variant: 'destructive',
            });
        } else {
            toast({
                title: t('message.success'),
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('email.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('email.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('password.label')}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder={t('password.placeholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{t('button')}</Button>
            </form>
        </Form>
    );
};

export default LoginForm;
