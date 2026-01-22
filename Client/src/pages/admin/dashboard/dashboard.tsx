import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  TrendingUp,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react'
import { useDashboardStats } from '../../../hooks/use-dashboard-stats'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats()
  const username = localStorage.getItem('username') || 'Admin'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <Loader2 className='w-12 h-12 animate-spin text-slate-600' />
            <LayoutDashboard className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400' />
          </div>
          <p className='text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs'>Platforma yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center h-[80vh] p-6'>
        <Card className='max-w-md w-full border-none shadow-2xl text-center p-8'>
          <div className='w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <XCircle className='w-10 h-10 text-red-500' />
          </div>
          <h2 className='text-2xl font-black text-slate-800 mb-2'>Xatolik yuz berdi</h2>
          <p className='text-slate-500 font-medium mb-6'>Ma'lumotlarni olishda muammo paydo bo'ldi. Iltimos, internetingizni tekshiring.</p>
          <Button onClick={() => window.location.reload()} className='w-full bg-slate-900 font-bold'>Qayta urinish</Button>
        </Card>
      </div>
    )
  }

  const stats = data.data

  const statsCards = [
    {
      title: 'Jami Ustozlar',
      value: stats.totalTeachers,
      icon: Users,
      color: 'sky',
    },
    {
      title: 'Jami Talabalar',
      value: stats.totalStudents,
      icon: GraduationCap,
      color: 'emerald',
    },
    {
      title: 'Faol Darslar',
      value: stats.totalLessons,
      icon: BookOpen,
      color: 'purple',
    },
    {
      title: 'Umumiy Tushum',
      value: stats.totalRevenue.toLocaleString('uz-UZ'),
      icon: DollarSign,
      color: 'orange',
    }
  ]

  return (
    <div className='space-y-4 bg-slate-200 dark:bg-slate-900 min-h-screen'>

      <div className='relative overflow-hidden rounded-3xl bg-slate-800 dark:bg-slate-700 p-8 text-white shadow-2xl'>
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Badge className='bg-slate-500/20 text-slate-300 border-none hover:bg-slate-500/30'>
                Admin Panel
              </Badge>
            </div>
            <h1 className='text-4xl font-black tracking-tight'>
              Xush kelibsiz, <span className='text-slate-400'>{username}</span> !
            </h1>
            <p className='text-slate-400 mt-2 font-medium max-w-max'>
              Bugun platformangizda o'sish kuzatilmoqda. Barcha ko'rsatkichlar joyida.
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsCards.map((stat) => (
          <Card key={stat.title} className='bg-white dark:bg-slate-800 border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className='w-6 h-6' />
                </div>
              </div>
              <div>
                <h3 className='text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-wider'>{stat.title}</h3>
                <p className='text-3xl font-black text-slate-900 dark:text-slate-100 mt-1'>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-3 gap-8'>
        <Card className='border-none shadow-sm dark:bg-slate-800'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg'><GraduationCap className='w-5 h-5 text-emerald-600 dark:text-emerald-400' /></div>
              <div>
                <CardTitle className='text-lg font-black dark:text-white'>Talabalar</CardTitle>
                <CardDescription className='text-xs font-bold dark:text-slate-400'>O'sish dinamikasi</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <CheckCircle className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                <span className='font-bold text-slate-700 dark:text-slate-300'>Faol foydalanuvchilar</span>
              </div>
              <span className='text-2xl font-black text-emerald-700 dark:text-emerald-400'>{stats.totalStudents}</span>
            </div>
            <div className='p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <XCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                <span className='font-bold text-slate-700 dark:text-slate-300'>Bloklanganlar</span>
              </div>
              <span className='text-2xl font-black text-red-700 dark:text-red-400'>0</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-none shadow-sm dark:bg-slate-800'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-sky-50 dark:bg-sky-900/30 rounded-lg'><Users className='w-5 h-5 text-sky-600 dark:text-sky-400' /></div>
              <div>
                <CardTitle className='text-lg font-black dark:text-white'>Ustozlar</CardTitle>
                <CardDescription className='text-xs font-bold dark:text-slate-400'>Reyting ko'rsatkichlari</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <TrendingUp className='w-5 h-5 text-sky-700 dark:text-sky-400' />
                <span className='font-bold text-slate-700 dark:text-slate-300'>Jami mutaxassislar</span>
              </div>
              <span className='text-2xl font-black text-sky-700 dark:text-sky-400'>{stats.totalTeachers}</span>
            </div>
            <div className='p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Star className='w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400' />
                <span className='font-bold text-slate-700 dark:text-slate-300'>O'rtacha sifat</span>
              </div>
              <span className='text-2xl font-black text-amber-700 dark:text-amber-400'>4.9</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-none shadow-sm bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900'>
          <CardHeader>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg'><BookOpen className='w-5 h-5 text-purple-600 dark:text-purple-400' /></div>
              <div>
                <CardTitle className='text-lg font-black dark:text-white'>Moliya & Ta'lim</CardTitle>
                <CardDescription className='text-xs font-bold dark:text-slate-400'>Moliyaviy hisobot</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <DollarSign className='w-5 h-5 text-orange-400' />
                <span className='font-bold'>Sof foyda</span>
              </div>
              <span className='text-xl font-black'>{(stats.totalRevenue / 1000).toFixed(1)}K <small className='text-[10px] text-slate-400 uppercase'>uzs</small></span>
            </div>
            <Button variant="outline" className='w-full h-14 rounded-2xl border-dashed border-2 font-bold group dark:border-slate-700 dark:text-white dark:hover:bg-slate-700' asChild>
              <Link to="/app/admin/payment">
                Barcha to'lovlarni ko'rish
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className='border-none shadow-sm overflow-hidden dark:bg-slate-800'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-xl font-black dark:text-white'>Tezkor Harakatlar</CardTitle>
          <CardDescription className='font-medium italic dark:text-slate-400'>Bo'limlarga tezkor o'tish tugmalari</CardDescription>
        </CardHeader>
        <CardContent className='p-2'>
          <div className='grid grid-cols-4 gap-4'>
            {[
              { title: 'Ustozlar', icon: Users, color: 'sky', link: '/app/admin/teacher' },
              { title: 'Talabalar', icon: GraduationCap, color: 'emerald', link: '/app/admin/student' },
              { title: 'Darslar', icon: BookOpen, color: 'purple', link: '/app/admin/lesson' },
              { title: "To'lovlar", icon: DollarSign, color: 'orange', link: '/app/admin/payment' }
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className='group relative flex flex-col items-center p-6 rounded-2xl bg-gray-200 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:bg-slate-800 dark:hover:bg-slate-600 transition-all duration-300 hover:shadow-xl overflow-hidden'
              >
                <div className={`p-4 rounded-xl bg-${item.color}-50 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400 group-hover:bg-white/10 group-hover:text-white transition-colors mb-3`}>
                  <item.icon className='w-6 h-6' />
                </div>
                <p className='text-sm font-black text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors'>
                  {item.title}
                </p>
                <div className='absolute bottom-0 left-0 w-full h-1 bg-cyan-700 scale-x-0 group-hover:scale-x-100 transition-transform' />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}