import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { TeacherService } from './api/teacher/teacher.service';
import { AdminService } from './api/admin/admin.service';
import { config } from './config';
import { CryptoService } from './infrastructure/crypto/crypto.service';
import { Roles } from './common/enum/index.enum';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from './core/entity/teacher.entity';
import { Admin } from './core/entity/admin.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const teacherService = app.get(TeacherService);
    const cryptoService = app.get(CryptoService);
    const adminRepo = app.get(getRepositoryToken(Admin));
    const teacherRepo = app.get(getRepositoryToken(Teacher));

    console.log('--- Seeding Started ---');

    // 1. Seed Admin
    const adminUsername = config.SUPERADMIN.SUPERADMIN_USERNAME || 'devzoyirov';
    const adminPassword = config.SUPERADMIN.SUPERADMIN_PASSWORD || 'zoyirov1911';

    const existingAdmin = await adminRepo.findOne({ where: { username: adminUsername } });

    if (!existingAdmin) {
        console.log(`Creating Admin: ${adminUsername}`);
        const hashedPassword = await cryptoService.encrypt(adminPassword);
        const admin = adminRepo.create({
            username: adminUsername,
            password: hashedPassword,
            phoneNumber: config.SUPERADMIN.SUPER_ADMIN_PHONE_NUMBER || '+998(94)979-19-14',
            role: Roles.SUPER_ADMIN
        });
        await adminRepo.save(admin);
        console.log('Admin created successfully.');
    } else {
        console.log('Admin already exists.');
    }

    // 2. Seed Teacher
    const teacherEmail = 'dimaotkirovich@gmail.com';
    const teacherPassword = "Z.D.O'.19.11.2006.";

    const existingTeacher = await teacherRepo.findOne({ where: { email: teacherEmail } });

    if (!existingTeacher) {
        console.log(`Creating Teacher: ${teacherEmail}`);
        const hashedPassword = await cryptoService.encrypt(teacherPassword);
        const teacher = teacherRepo.create({
            email: teacherEmail,
            fullName: 'Diyor Zoyirov', // Hardcoded name for demo
            password: hashedPassword,
            isActive: true, // Auto-activate
            isComplete: true,
            phoneNumber: '+998000000000', // Dummy phone
            role: Roles.TEACHER
        });
        await teacherRepo.save(teacher);
        console.log('Teacher created successfully.');
    } else {
        console.log('Teacher already exists.');
        // Optional: Reset password if exists but login fails
        // const hashedPassword = await cryptoService.encrypt(teacherPassword);
        // await teacherRepo.update(existingTeacher.id, { password: hashedPassword, isActive: true });
        // console.log('Teacher password reset.');
    }

    console.log('--- Seeding Completed ---');
    await app.close();
}

bootstrap();
