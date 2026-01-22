import { useState } from 'react'
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
import { LogIn, ShieldCheck, GraduationCap, Users, ArrowLeft, Mail, Moon, Sun, Globe } from 'lucide-react'
import { request } from '../../config/request'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../components/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"


type Role = 'admin' | 'teacher' | 'student'

const adminSchema = z.object({
  username: z.string().min(2, "Username min 2 chars").max(50),
  password: z.string().min(2, "Password min 2 chars").max(50),
})

const teacherSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(2, "Password min 2 chars").max(50),
})

const UnifiedLogin = () => {
  const { t, i18n } = useTranslation();
  const { setTheme, theme } = useTheme();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { mutate: adminMutate } = UseLogin()

  const adminForm = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: "devzoyirov",
      password: "zoyirov1911",
    },
  })

  const teacherForm = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      email: "dimaotkirovich@gmail.com",
      password: "Z.D.O'.19.11.2006.",
    },
  })

  // Language Switcher
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  const handleAdminLogin = (values: z.infer<typeof adminSchema>) => {
    adminMutate(values, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('role', res.data.role.toLowerCase())
        localStorage.setItem('username', res.data.username)

        toast.success(res.message.uz || t('login_success'))
        navigate(`/app/${res.data.role.toLowerCase()}`)
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message?.uz || "Error")
      }
    })
  }

  const handleTeacherLogin = async (values: z.infer<typeof teacherSchema>) => {
    setLoading(true)
    try {
      const res = await request.post('/signin/teacher', {
        email: values.email,
        password: values.password
      })

      const token = res.data.data

      localStorage.setItem('token', token)
      localStorage.setItem('role', 'teacher')

      toast.success(t('login_success') || 'Login successful!')
      navigate('/teacher/lesson')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleStudentLogin = () => {
    navigate('/telegram')
  }

  const handleGoogleLogin = () => {
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1911/api/v1' // Updated port
    window.location.href = `${BASE_URL}/teacher/google`
  }

  const roles = [
    {
      id: 'admin' as Role,
      title: t('admin_panel'),
      desc: t('admin_desc'),
      icon: ShieldCheck,
      gradient: 'from-slate-600 via-gray-500 to-slate-400',
      color: 'slate'
    },
    {
      id: 'teacher' as Role,
      title: t('teacher_panel'),
      desc: t('teacher_desc'),
      icon: GraduationCap,
      gradient: 'from-sky-600 via-blue-500 to-sky-400',
      color: 'sky'
    },
    {
      id: 'student' as Role,
      title: t('student_login'),
      desc: t('student_desc'),
      icon: Users,
      gradient: 'from-emerald-600 via-green-500 to-emerald-400',
      color: 'emerald'
    }
  ]

  const ControlPanel = () => (
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
  )

  if (!selectedRole) {
    return (
      <div className='min-h-screen relative overflow-hidden flex items-center justify-center md:justify-start p-4 md:pl-32 transition-colors duration-500 bg-slate-900 dark:bg-slate-950'>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-70 dark:opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/40" />

        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />

        <ControlPanel />

        <div className='w-full max-w-md bg-white/10 dark:bg-slate-950/50 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative z-10 animate-in fade-in zoom-in duration-500'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-transform duration-300'>
              <LogIn className='w-10 h-10 text-white' />
            </div>
            <h1 className='text-4xl font-bold text-white mb-3 tracking-tight'>HMHY CRM</h1>
            <p className='text-slate-300 text-sm font-medium'>{t('select_role')}</p>
          </div>

          <div className='space-y-4'>
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group w-full flex items-center p-4 bg-white/5 hover:bg-white/15 dark:bg-slate-900/40 dark:hover:bg-slate-800/60 border border-white/10 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className='w-6 h-6' />
                  </div>
                  <div className='ml-4 flex-1 text-left'>
                    <h3 className='text-lg font-bold text-white tracking-wide'>{role.title}</h3>
                    <p className='text-xs text-slate-300 font-medium opacity-80'>{role.desc}</p>
                  </div>
                  <ArrowLeft className='w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all' />
                </button>
              )
            })}
          </div>

          <p className='text-center mt-8 text-[10px] text-slate-100/80 font-medium uppercase tracking-widest shadow-black drop-shadow-md'>
            Made by Diyor Zoyirov | {t('rights_reserved')}
          </p>
        </div>
      </div>
    )
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)!

  return (
    <div className='min-h-screen relative overflow-hidden flex items-center justify-center md:justify-start p-4 md:pl-32 bg-slate-900 dark:bg-slate-950 transition-colors duration-500'>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-70 dark:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/40" />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />

      <ControlPanel />

      <div className='w-full max-w-md bg-white/10 dark:bg-slate-950/50 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative z-10 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500'>
        <button
          onClick={() => setSelectedRole(null)}
          className='mb-8 flex items-center text-slate-300 hover:text-white transition-colors group'
        >
          <div className='p-1 rounded-lg bg-white/5 mr-2 group-hover:bg-white/10 transition-colors'>
            <ArrowLeft className='w-4 h-4' />
          </div>
          <span className='text-sm font-medium'>{t('back')}</span>
        </button>

        <div className='text-center mb-8'>
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${selectedRoleData.gradient} rounded-2xl mb-6 shadow-lg transform transition-transform hover:scale-105 duration-300`}>
            <selectedRoleData.icon className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-2 tracking-tight'>{selectedRoleData.title}</h1>
          <p className='text-slate-300 text-sm font-medium'>{t('enter_credentials')}</p>
        </div>

        {selectedRole === 'admin' && (
          <Form {...adminForm}>
            <form onSubmit={adminForm.handleSubmit(handleAdminLogin)} className="space-y-5" autoComplete="off">
              <FormField
                control={adminForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-200 font-semibold pl-1'>{t('username')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('username')}
                        {...field}
                        autoComplete="off"
                        disabled={adminForm.formState.isSubmitting}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={adminForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-200 font-semibold pl-1'>{t('password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        autoComplete="new-password"
                        disabled={adminForm.formState.isSubmitting}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] duration-300 mt-4`}
                disabled={adminForm.formState.isSubmitting}
              >
                {adminForm.formState.isSubmitting ? (
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
            </form>
          </Form>
        )}

        {selectedRole === 'teacher' && (
          <Form {...teacherForm}>
            <form onSubmit={teacherForm.handleSubmit(handleTeacherLogin)} className="space-y-5" autoComplete="off">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-12 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl text-white font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] duration-300"
              >
                <Mail className="w-5 h-5 text-red-400" />
                {t('google_login')}
              </button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900/50 backdrop-blur-sm px-2 text-slate-400 font-semibold tracking-wider rounded-md">{t('or')}</span>
                </div>
              </div>

              <FormField
                control={teacherForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-200 font-semibold pl-1'>{t('email')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('email')}
                        {...field}
                        autoComplete="off"
                        disabled={loading}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={teacherForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-200 font-semibold pl-1'>{t('password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        autoComplete="new-password"
                        disabled={loading}
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/30 rounded-xl transition-all font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] duration-300 mt-4`}
                disabled={loading}
              >
                {loading ? (
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
            </form>
          </Form>
        )}

        {selectedRole === 'student' && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
                <Users className="relative w-16 h-16 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('telegram_login')}</h3>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed font-medium">
                {t('student_info')}
              </p>
              <Button
                onClick={handleStudentLogin}
                className={`w-full h-12 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] duration-300`}
              >
                <span className="flex items-center gap-2 text-lg">
                  <LogIn className="w-5 h-5" /> {t('telegram_login')}
                </span>
              </Button>
            </div>
          </div>
        )}

        <div className='mt-8 pt-6 border-t border-white/10'>
          <p className='text-[10px] text-center text-slate-400 font-semibold uppercase tracking-widest opacity-70'>
            {t('system_control')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UnifiedLogin
