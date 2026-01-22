import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          admin_panel: "Admin Panel",
          teacher_panel: "Teacher Panel",
          student_login: "Student Login",
          username: "Username",
          password: "Password",
          email: "Email",
          login: "Login",
          loading: "Loading...",
          or: "OR",
          back: "Back",
          select_role: "Select your role",
          admin_desc: "System management and control",
          teacher_desc: "Manage lessons and groups",
          student_desc: "Login via Telegram bot",
          enter_credentials: "Enter your credentials",
          system_control: "Secure System Control",
          google_login: "Login with Google",
          telegram_login: "Go to Telegram Bot",
          student_info: "Log in to the student panel effectively via the Telegram bot",
          rights_reserved: "© 2026 HMHY Platform. All rights reserved.",

          teacher: {
            profile: "My Profile",
            edit_profile: "Edit Profile",
            change_password: "Change Password",
            save: "Save Changes",
            cancel: "Cancel",
            current_password: "Current Password",
            new_password: "New Password",
            confirm_password: "Confirm New Password",
            update_password: "Update Password",

            payments: "My Payments",
            payments_subtitle: "Payment history and statistics",
            paid: "Paid",
            unpaid: "Unpaid",
            cancelled: "Cancelled",
            payment_count: "payments",
            lesson_count: "lessons",
            payment_history: "Payment History",
            payment_list: "List of all payments made to you",
            all: "All",
            no_payments: "No payments found",
            empty_list: "Payment list is empty",

            lessons: "Lessons",
            schedule: "Schedule",
            statistics: "Statistics",
          },

          admin: {
            dashboard: "Dashboard",
            users: "Users",
            teachers: "Teachers",
            students: "Students",
            settings: "Settings",
            statistics: "Statistics",
          },

          common: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            view: "View",
            search: "Search",
            filter: "Filter",
            export: "Export",
            import: "Import",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            confirm: "Confirm",
            total: "Total",
          }
        }
      },
      ru: {
        translation: {
          welcome: "Добро пожаловать",
          admin_panel: "Панель администратора",
          teacher_panel: "Панель учителя",
          student_login: "Вход для студентов",
          username: "Имя пользователя",
          password: "Пароль",
          email: "Электронная почта",
          login: "Войти",
          loading: "Загрузка...",
          or: "ИЛИ",
          back: "Назад",
          select_role: "Выберите вашу роль",
          admin_desc: "Управление системой и контроль",
          teacher_desc: "Управление уроками и группами",
          student_desc: "Вход через Telegram бот",
          enter_credentials: "Введите ваши данные",
          system_control: "Безопасное управление системой",
          google_login: "Войти через Google",
          telegram_login: "Перейти в Telegram бот",
          student_info: "Для входа в панель студента просим пройти регистрацию через Telegram бот",
          rights_reserved: "© 2026 Платформа HMHY. Все права защищены.",

          teacher: {
            profile: "Мой профиль",
            edit_profile: "Редактировать профиль",
            change_password: "Изменить пароль",
            save: "Сохранить изменения",
            cancel: "Отмена",
            current_password: "Текущий пароль",
            new_password: "Новый пароль",
            confirm_password: "Подтвердите новый пароль",
            update_password: "Обновить пароль",

            payments: "Мои платежи",
            payments_subtitle: "История платежей и статистика",
            paid: "Оплачено",
            unpaid: "Не оплачено",
            cancelled: "Отменено",
            payment_count: "платежей",
            lesson_count: "уроков",
            payment_history: "История платежей",
            payment_list: "Список всех платежей, сделанных вам",
            all: "Все",
            no_payments: "Платежи не найдены",
            empty_list: "Список платежей пуст",

            lessons: "Уроки",
            schedule: "Расписание",
            statistics: "Статистика",
          },

          admin: {
            dashboard: "Панель управления",
            users: "Пользователи",
            teachers: "Учителя",
            students: "Студенты",
            settings: "Настройки",
            statistics: "Статистика",
          },

          common: {
            save: "Сохранить",
            cancel: "Отмена",
            delete: "Удалить",
            edit: "Редактировать",
            view: "Просмотр",
            search: "Поиск",
            filter: "Фильтр",
            export: "Экспорт",
            import: "Импорт",
            loading: "Загрузка...",
            error: "Ошибка",
            success: "Успешно",
            confirm: "Подтвердить",
            total: "Всего",
          }
        }
      },
      uz: {
        translation: {
          welcome: "Xush kelibsiz",
          admin_panel: "Admin Panel",
          teacher_panel: "O'qituvchi Paneli",
          student_login: "Talaba Kirish",
          username: "Foydalanuvchi nomi",
          password: "Parol",
          email: "Email",
          login: "Kirish",
          loading: "Yuklanmoqda...",
          or: "YOKI",
          back: "Orqaga",
          select_role: "Rolingizni tanlang",
          admin_desc: "Tizimni boshqarish va nazorat",
          teacher_desc: "Darslar va guruhlarni boshqarish",
          student_desc: "Telegram bot orqali kirish",
          enter_credentials: "Ma'lumotlaringizni kiriting",
          system_control: "Xavfsiz tizim boshqaruvi",
          google_login: "Google orqali kirish",
          telegram_login: "Telegram Botga o'tish",
          student_info: "Student paneliga kirish uchun Telegram bot orqali ro'yxatdan o'ting",
          rights_reserved: "© 2026 HMHY Platform. Barcha huquqlar himoyalangan.",

          teacher: {
            profile: "Mening Profilim",
            edit_profile: "Profilni tahrirlash",
            change_password: "Parolni o'zgartirish",
            save: "O'zgarishlarni saqlash",
            cancel: "Bekor qilish",
            current_password: "Joriy parol",
            new_password: "Yangi parol",
            confirm_password: "Yangi parolni tasdiqlang",
            update_password: "Parolni yangilash",

            payments: "To'lovlarim",
            payments_subtitle: "O'tkazilgan to'lovlar va statistika",
            paid: "To'langan",
            unpaid: "To'lanmagan",
            cancelled: "Bekor qilingan",
            payment_count: "ta to'lov",
            lesson_count: "ta dars",
            payment_history: "To'lovlar tarixi",
            payment_list: "Sizga amalga oshirilgan barcha to'lovlar ro'yxati",
            all: "Barchasi",
            no_payments: "To'lovlar topilmadi",
            empty_list: "To'lovlar ro'yxati bo'sh",

            lessons: "Darslar",
            schedule: "Jadval",
            statistics: "Statistika",
          },

          admin: {
            dashboard: "Boshqaruv paneli",
            users: "Foydalanuvchilar",
            teachers: "O'qituvchilar",
            students: "Talabalar",
            settings: "Sozlamalar",
            statistics: "Statistika",
          },

          common: {
            save: "Saqlash",
            cancel: "Bekor qilish",
            delete: "O'chirish",
            edit: "Tahrirlash",
            view: "Ko'rish",
            search: "Qidirish",
            filter: "Filtr",
            export: "Eksport",
            import: "Import",
            loading: "Yuklanmoqda...",
            error: "Xatolik",
            success: "Muvaffaqiyatli",
            confirm: "Tasdiqlash",
            total: "Jami",
          }
        }
      }
    }
  });

export default i18n;
