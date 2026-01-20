# HMHY CRM System

HMHY - Bu Admin, Teacher va Student uchun mo'ljallangan CRM tizimi.

## 📁 Loyiha Strukturasi

```
HMHY/
├── Client/          # Frontend (React + TypeScript + Vite)
├── Server/          # Backend (NestJS + TypeScript + PostgreSQL)
└── README.md
```

## ✨ Yaratilgan Yaxshilanishlar

### 1. ✅ Unified Login Page
- Admin, Teacher va Student uchun bitta zamonaviy login sahifasi
- Role selection bilan chiroyli UI/UX
- Gradient dizayn va animatsiyalar
- Responsive dizayn

### 2. ✅ Kod Sifatini Yaxshilash
- Duplicate importlar tuzatildi (app.module.ts)
- Console.log statementlar tozalandi
- Kod strukturasi yaxshilandi

### 3. ✅ Environment Configuration
- `.env.example` fayllar yaratildi (agar kerak bo'lsa)
- Konfiguratsiya dokumentatsiyasi

## 🚀 Loyihani Ishga Tushirish

### Frontend (Client)

```bash
cd Client
npm install
npm run dev
```

Frontend `http://localhost:5173` da ishga tushadi.

### Backend (Server)

```bash
cd Server
npm install
npm run start:dev
```

Backend `http://localhost:2006` da ishga tushadi.

**Muhim:** Backend ishlashi uchun `.env` fayl yaratishingiz kerak. Quyidagi o'zgaruvchilar kerak:

```env
DB_URL=postgresql://username:password@localhost:5432/hmhy_db
PORT=2026
NODE_ENV=development
ACCESS_TOKEN_KEY=your-secret-key
REFRESH_TOKEN_KEY=your-refresh-secret-key
JWT_SECRET_KEY=your-jwt-secret
# ... va boshqalar (Server/.env.example ga qarang)
```

## 🔐 Login Tizimi

### Unified Login Page
Asosiy sahifa: `http://localhost:5173/` yoki `http://localhost:5173/login`

Bu sahifada 3 ta role tanlash mumkin:
1. **Admin** - Username va Password bilan
2. **Teacher** - Email/Password yoki Google OAuth
3. **Student** - Telegram Bot orqali

### Eski Login Sahifalar (hali ham mavjud)
- `/admin/login` - Admin login
- `/teacher/login` - Teacher login  
- `/student/login` - Student login (Telegram)

## 📝 API Endpoints

### Authentication
- `POST /api/v1/signin/admin` - Admin login
- `POST /api/v1/signin/teacher` - Teacher login
- `POST /api/v1/telegram/login` - Student login (Telegram)
- `POST /api/v1/new-token` - Token yangilash
- `POST /api/v1/signout` - Logout

### Swagger Documentation
Backend ishga tushgandan keyin: `http://localhost:2026/api/docs`

## 🛠️ Texnologiyalar

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI
- Zod (Validation)
- React Hook Form

### Backend
- NestJS 11
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Redis
- Google OAuth
- Telegram Bot API
- Winston (Logging)

## 📂 Folder Struktura

### Frontend (Client/src)
```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
│   ├── admin/       # Admin pages
│   ├── teacher/     # Teacher pages
│   ├── student/     # Student pages
│   └── auth/        # Authentication pages
├── layout/          # Layout components
├── routes/          # Route definitions
├── hooks/           # Custom React hooks
├── config/          # Configuration files
└── lib/             # Utility functions
```

### Backend (Server/src)
```
src/
├── api/             # API modules (admin, auth, teacher, etc.)
├── common/          # Shared utilities (guards, decorators, etc.)
├── core/            # Core entities and repositories
├── infrastructure/ # Infrastructure services (email, token, etc.)
└── config/          # Configuration
```

## ⚠️ Eslatmalar

1. **Database**: PostgreSQL database yaratib, `DB_URL` ni to'g'ri sozlang
2. **Redis**: Redis server ishga tushirilgan bo'lishi kerak
3. **Environment Variables**: Barcha kerakli o'zgaruvchilar `.env` faylida bo'lishi kerak
4. **Telegram Bot**: Student login uchun Telegram bot token kerak

## 🔄 Keyingi Yaxshilanishlar

- [ ] Folder nomlarini o'zgartirish (Client -> frontend, Server -> backend)
- [ ] Frontend folder strukturasini yanada yaxshilash
- [ ] Backend folder strukturasini yanada yaxshilash
- [ ] Testlar qo'shish
- [ ] CI/CD pipeline

## 📞 Yordam

Agar muammo bo'lsa:
1. `.env` fayllarni tekshiring
2. Database va Redis ishlayotganini tekshiring
3. Console loglarni ko'rib chiqing
4. Swagger dokumentatsiyasini tekshiring

---

**Yaratilgan:** 2026
**Versiya:** 1.0.0

