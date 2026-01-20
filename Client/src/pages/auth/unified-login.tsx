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
import { LogIn, ShieldCheck, GraduationCap, Users, ArrowLeft, Mail } from 'lucide-react'
import { request } from '../../config/request'

type Role = 'admin' | 'teacher' | 'student'

const adminSchema = z.object({
  username: z.string().min(2, "Username kamida 2 ta belgi bo'lishi kerak").max(50),
  password: z.string().min(2, "Password kamida 2 ta belgi bo'lishi kerak").max(50),
})

const teacherSchema = z.object({
  email: z.string().email("To'g'ri email kiriting"),
  password: z.string().min(2, "Password kamida 2 ta belgi bo'lishi kerak").max(50),
})

const UnifiedLogin = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { mutate: adminMutate } = UseLogin()

  const adminForm = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const teacherForm = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleAdminLogin = (values: z.infer<typeof adminSchema>) => {
    adminMutate(values, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('role', res.data.role.toLowerCase())
        localStorage.setItem('username', res.data.username)

        toast.success(res.message.uz || 'Login muvaffaqiyatli!')
        navigate(`/app/${res.data.role.toLowerCase()}`)
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message?.uz || "Xatolik yuz berdi")
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

      toast.success('Login muvaffaqiyatli!')
      navigate('/teacher/lesson')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login muvaffaqiyatsiz')
    } finally {
      setLoading(false)
    }
  }

  const handleStudentLogin = () => {
    navigate('/telegram')
  }

  const handleGoogleLogin = () => {
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2026/api/v1'
    window.location.href = `${BASE_URL}/teacher/google`
  }

  const roles = [
    {
      id: 'admin' as Role,
      title: 'Admin',
      desc: 'Tizimni boshqarish va nazorat',
      icon: ShieldCheck,
      gradient: 'from-slate-600 via-gray-500 to-slate-400',
      color: 'slate'
    },
    {
      id: 'teacher' as Role,
      title: 'Teacher',
      desc: 'Darslar va guruhlarni boshqarish',
      icon: GraduationCap,
      gradient: 'from-sky-600 via-blue-500 to-sky-400',
      color: 'sky'
    },
    {
      id: 'student' as Role,
      title: 'Student',
      desc: 'Telegram bot orqali kirish',
      icon: Users,
      gradient: 'from-emerald-600 via-green-500 to-emerald-400',
      color: 'emerald'
    }
  ]

  if (!selectedRole) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
        {/* Animated background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-sky-600/20 rounded-full blur-3xl" />

        <div className='w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl mb-4 shadow-lg'>
              <LogIn className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>HMHY CRM</h1>
            <p className='text-slate-400 text-sm'>Tizimga kirish uchun rolingizni tanlang</p>
          </div>

          <div className='space-y-3'>
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group w-full flex items-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className='w-6 h-6' />
                  </div>
                  <div className='ml-4 flex-1 text-left'>
                    <h3 className='text-lg font-semibold text-white'>{role.title}</h3>
                    <p className='text-sm text-slate-400'>{role.desc}</p>
                  </div>
                  <ArrowLeft className='w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all' />
                </button>
              )
            })}
          </div>

          <p className='text-center mt-8 text-xs text-slate-500'>
            © 2026 HMHY Platform. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    )
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)!

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className='w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10'>
        <button
          onClick={() => setSelectedRole(null)}
          className='mb-6 flex items-center text-slate-400 hover:text-white transition-colors'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          <span className='text-sm'>Orqaga</span>
        </button>

        <div className='text-center mb-8'>
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${selectedRoleData.gradient} rounded-2xl mb-4 shadow-lg`}>
            <selectedRoleData.icon className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-white mb-2'>{selectedRoleData.title} Panel</h1>
          <p className='text-slate-400 text-sm'>Ma'lumotlaringizni kiriting</p>
        </div>

        {selectedRole === 'admin' && (
          <Form {...adminForm}>
            <form onSubmit={adminForm.handleSubmit(handleAdminLogin)} className="space-y-5">
              <FormField
                control={adminForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-300 font-semibold'>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username kiriting"
                        {...field}
                        disabled={adminForm.formState.isSubmitting}
                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/20"
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
                    <FormLabel className='text-slate-300 font-semibold'>Parol</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        disabled={adminForm.formState.isSubmitting}
                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full h-11 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-medium rounded-lg transition-all shadow-lg`}
                disabled={adminForm.formState.isSubmitting}
              >
                {adminForm.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Yuklanmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Tizimga kirish
                  </span>
                )}
              </Button>
            </form>
          </Form>
        )}

        {selectedRole === 'teacher' && (
          <Form {...teacherForm}>
            <form onSubmit={teacherForm.handleSubmit(handleTeacherLogin)} className="space-y-5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-11 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white font-medium transition-all"
              >
                <Mail className="w-5 h-5" />
                Google orqali kirish
              </button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800/50 px-2 text-slate-400">Yoki</span>
                </div>
              </div>

              <FormField
                control={teacherForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-slate-300 font-semibold'>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                        disabled={loading}
                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/20"
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
                    <FormLabel className='text-slate-300 font-semibold'>Parol</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="••••••••"
                        {...field}
                        disabled={loading}
                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-white/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full h-11 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-medium rounded-lg transition-all shadow-lg`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Yuklanmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Tizimga kirish
                  </span>
                )}
              </Button>
            </form>
          </Form>
        )}

        {selectedRole === 'student' && (
          <div className="space-y-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Telegram Bot orqali kirish</h3>
              <p className="text-sm text-slate-400 mb-6">
                Student paneliga kirish uchun Telegram bot orqali ro'yxatdan o'ting
              </p>
              <Button
                onClick={handleStudentLogin}
                className={`w-full h-11 bg-gradient-to-r ${selectedRoleData.gradient} hover:opacity-90 text-white font-medium rounded-lg transition-all shadow-lg`}
              >
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Telegram Botga o'tish
                </span>
              </Button>
            </div>
          </div>
        )}

        <div className='mt-8 pt-6 border-t border-white/10'>
          <p className='text-[11px] text-center text-slate-500 leading-relaxed uppercase tracking-widest'>
            Xavfsiz tizim boshqaruvi
          </p>
        </div>
      </div>
    </div>
  )
}

export default UnifiedLogin

