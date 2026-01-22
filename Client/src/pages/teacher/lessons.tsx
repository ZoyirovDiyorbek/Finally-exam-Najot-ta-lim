import { useState } from "react";
import { BookOpen, CalendarDays, Layers, Filter } from "lucide-react";
import { useLessonsList } from "./service/query/useLessonsList";
import { StatsCard } from "./components/stats-card";

import { LessonsSkeleton } from "./components/lesson-skeleton";
import { useLessonsStats } from "./service/query/lessonStats";
import { LessonCard } from "./components/lesson-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export const TeacherLessons = () => {
    const [filter, setFilter] = useState("all");

    const { data: lessonsData, isPending: lessonsPending } =
        useLessonsList(filter);
    const { data: statsData, isPending: statsPending } = useLessonsStats();

    if (lessonsPending || statsPending) return <LessonsSkeleton />;
    console.log(statsData)

    const stats = statsData?.data ||
        statsData || {
        totalLessons: 0,
        bookedLessons: 0,
        totalPages: 0,
        currentPage: 1,
    };

    const lessons = lessonsData?.data || [];

    return (
        <div className="min-h-screen p-4 space-y-6 md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
                        <BookOpen className="w-6 h-6" /> Mening Darslarim
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        O'quvchilar tomonidan band qilingan darslar ro'yxati
                    </p>
                </div>

                <div className="flex items-center gap-2 text-black dark:text-white">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-35 bg-white dark:bg-slate-800">
                            <SelectValue placeholder="Saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Barchasi</SelectItem>
                            <SelectItem value="booked">Band</SelectItem>
                            <SelectItem value="available">Bo'sh</SelectItem>
                            <SelectItem value="completed">Tugagan</SelectItem>
                            <SelectItem value="canceled">
                                Bekor qilingan
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-3">
                <StatsCard
                    label="Jami Darslar"
                    value={stats.totalLessons}
                    icon={BookOpen}
                    labelColor="text-sky-700 dark:text-sky-400"
                    iconColor="bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                />
                <StatsCard
                    label="Band Darslar"
                    value={stats.bookedLessons}
                    icon={CalendarDays}
                    labelColor="text-sky-700 dark:text-sky-400"
                    iconColor="bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                />
                <StatsCard
                    label="Sahifa"
                    value={`${stats.currentPage || 1} / ${stats.totalPages || 0
                        }`}
                    icon={Layers}
                    labelColor="text-sky-700 dark:text-sky-400"
                    iconColor="bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Darslar jadvali
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded border dark:border-slate-700">
                        Jami: {lessons.length} ta dars
                    </span>
                </div>

                {lessons.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {lessons.map((lesson: any) => (
                            <LessonCard key={lesson.id} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-75 bg-white dark:bg-slate-800 border border-dashed dark:border-slate-700 rounded-xl">
                        <div className="p-4 mb-4 rounded-full bg-slate-50 dark:bg-slate-700">
                            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Darslar topilmadi
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};
