import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { PasswordInput } from '../../components/ui/password-input'
import { UseLogin } from './service/use-login'
import { toast } from 'sonner'
import { LogIn, ShieldCheck, ArrowLeft, Globe, Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../components/theme-provider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

const formSchema = z.object({
    username: z.string().min(2, "Username min 2 chars").max(50),
    password: z.string().min(2, "Password min 2 chars").max(50),
})

const Login = () => {
    const { t, i18n } = useTranslation();
    const { setTheme, theme } = useTheme();
    const { mutate, isPending } = UseLogin()
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "devzoyirov",
            password: "zoyirov1911",
        },
    })

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess: (res) => {
                localStorage.setItem('token', res.data.accessToken)
                localStorage.setItem('role', res.data.role.toLowerCase())
                localStorage.setItem('username', res.data.username)

                toast.success(res.message.uz || t('login_success') || 'Login successful!')
                navigate(`/app/${res.data.role.toLowerCase()}`)
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message?.uz || "Error")
            }
        })
    }

    return (
        <div className='min-h-screen relative overflow-hidden flex items-center justify-center md:justify-start p-4 md:pl-32 bg-slate-900 dark:bg-slate-950 transition-colors duration-500'>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-70 dark:opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/40" />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />

            {/* Control Panel */}
            <div className="absolute top-4 right-4 flex gap-2 z-50">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white rounded-full transition-all duration-300">
                            <Globe className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800">
                        <DropdownMenuItem onClick={() => changeLanguage('uz')}>O'zbekcha</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage('ru')}>Русский</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white rounded-full transition-all duration-300"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-300" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>

            <div className='w-full max-w-md bg-white/10 dark:bg-slate-950/50 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative z-10 animate-in fade-in zoom-in duration-500'>
                <button
                    onClick={() => navigate('/')}
                    className='mb-6 flex items-center text-slate-300 hover:text-white transition-colors group'
                >
                    <div className='p-1 rounded-lg bg-white/5 mr-2 group-hover:bg-white/10 transition-colors'>
                        <ArrowLeft className='w-4 h-4' />
                    </div>
                    <span className='text-sm font-medium'>{t('back')}</span>
                </button>

                <div className='flex flex-col items-center mb-8'>
                    <div className='w-16 h-16 bg-gradient-to-br from-slate-600 via-gray-500 to-slate-400 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-500/20 mb-4 transform hover:scale-105 transition-transform duration-300'>
                        <ShieldCheck className='text-white w-8 h-8' />
                    </div>
                    <h1 className='text-3xl font-bold text-white tracking-tight'>{t('admin_panel')}</h1>
                    <p className='text-slate-300 text-sm mt-1 text-center font-medium'>
                        {t('enter_credentials')}
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-slate-200 font-semibold pl-1'>{t('username')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t('username')}
                                            {...field}
                                            autoComplete="off"
                                            disabled={isPending}
                                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className='text-slate-200 font-semibold pl-1'>{t('password')}</FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="••••••••"
                                            {...field}
                                            autoComplete="new-password"
                                            disabled={isPending}
                                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-slate-600 via-gray-500 to-slate-400 hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] duration-300 mt-4 cursor-pointer"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t('loading')}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-lg">
                                    <LogIn className="w-5 h-5" /> {t('login')}
                                </span>
                            )}
                        </Button>

                        <div className="relative py-3">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900/50 backdrop-blur-sm px-2 text-slate-400 font-semibold tracking-wider rounded-md">{t('or')}</span></div>
                        </div>

                        <div className='text-center'>
                            <p className='text-sm text-slate-400 mb-2 font-medium'>{t('teacher_panel')}?</p>
                            <a
                                href='/teacher/login'
                                className='text-blue-400 hover:text-blue-300 font-bold text-sm inline-flex items-center gap-1 hover:underline transition-colors'
                            >
                                {t('login')} <span className="text-lg">→</span>
                            </a>
                        </div>
                    </form>
                </Form>

                <div className='mt-8 pt-6 border-t border-white/10'>
                    <p className='text-[10px] text-center text-slate-400 font-semibold uppercase tracking-widest opacity-70'>
                        {t('system_control')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
