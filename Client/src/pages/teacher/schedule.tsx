import { useState } from "react";
import { Plus, Info, Calendar } from "lucide-react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { Button } from "../../components/ui/button";
import { useLessonsList } from "./service/query/useLessonsList";
import { WeekCalendar } from "./components/week-calendar";
import { LessonCard } from "./components/lesson-card";
import { LessonsSkeleton } from "./components/lesson-skeleton";
import { CreateLessonForm } from "./components/create-lesson";

export const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [isCreating, setIsCreating] = useState(false);

    const { data, isPending } = useLessonsList("all", selectedDate);
    const lessons = data?.data || [];

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700 rounded-xl shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Mening Darslarim
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                                Dars jadvalingizni boshqaring
                            </p>
                        </div>
                    </div>
                </div>
                {!isCreating && (
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 dark:from-sky-500 dark:to-blue-500 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                    >
                        <Plus className="w-4 h-4" /> Dars yaratish
                    </Button>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                <WeekCalendar
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />
            </div>

            {isCreating ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors">
                    <CreateLessonForm
                        selectedDate={selectedDate}
                        onCancel={() => setIsCreating(false)}
                    />
                </div>
            ) : (
                <>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-6 transition-colors">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                    {format(
                                        new Date(selectedDate),
                                        "EEEE, d-MMMM, yyyy",
                                        { locale: uz }
                                    )}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {lessons.length > 0
                                        ? `${lessons.length} ta dars rejalashtirilgan`
                                        : "Darslar rejalashtirilmagan"}
                                </p>
                            </div>
                            {lessons.length > 0 && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold text-sky-700 dark:text-sky-400">
                                        {lessons.length} ta faol dars
                                    </span>
                                </div>
                            )}
                        </div>

                        {isPending ? (
                            <LessonsSkeleton />
                        ) : lessons.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {lessons.map((lesson: any) => (
                                    <LessonCard key={lesson.id} lesson={lesson} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-75 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center transition-colors">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 dark:from-sky-500/10 dark:to-blue-500/10 blur-2xl rounded-full"></div>
                                    <div className="relative w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                                        <Info className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    Ushbu kun uchun darslar mavjud emas
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                                    Yangi dars qo'shish uchun yuqoridagi tugmani bosing
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                                    onClick={() => setIsCreating(true)}
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Yangi dars qo'shish
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
