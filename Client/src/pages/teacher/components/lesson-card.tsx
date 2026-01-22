import { MapPin, Clock, ExternalLink, Video } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { format } from "date-fns";

export const LessonCard = ({ lesson }: { lesson: any }) => {
    const statusStyles: Record<string, string> = {
        AVAILABLE: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40",
        BOOKED: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40",
        CANCELLED: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40",
    };

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-lg dark:hover:shadow-2xl hover:shadow-sky-100 dark:hover:shadow-sky-900/20 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 dark:from-sky-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10 flex justify-between items-start mb-4">
                <div className="space-y-2">
                    <Badge
                        variant="secondary"
                        className={`${statusStyles[lesson.status] || ""} font-semibold`}
                    >
                        {lesson.status}
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {lesson.name}
                    </h3>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                        {Number(lesson.price).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">
                        UZS
                    </p>
                </div>
            </div>

            <div className="relative z-10 space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <Clock className="w-4 h-4 mr-2 text-sky-600 dark:text-sky-400" />
                    <span className="font-semibold">
                        {format(new Date(lesson.startTime), "HH:mm")} -{" "}
                        {format(new Date(lesson.endTime), "HH:mm")}
                    </span>
                    <span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {format(new Date(lesson.startTime), "dd-MMM")}
                    </span>
                </div>

                {lesson.googleMeetUrl && (
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/50">
                        <Video className="w-4 h-4 mr-2" />
                        <a
                            href={lesson.googleMeetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate hover:underline font-semibold flex items-center gap-1"
                        >
                            Google Meet
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
            </div>

            <Button
                variant="outline"
                className="relative z-10 w-full border-2 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:border-sky-300 dark:hover:border-sky-700 font-semibold transition-all"
                asChild
            >
                <a href={lesson.googleMeetUrl} target="_blank" rel="noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />
                    Darsga qo'shilish
                </a>
            </Button>
        </div>
    );
};
