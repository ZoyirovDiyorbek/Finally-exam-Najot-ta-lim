import { useTeacherStats } from "./service/query/useTeacherStats";
import { Wallet, TrendingUp, TrendingDown, XCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PaymentsSkeleton } from "./components/payments-skeleton";
import { useTranslation } from "react-i18next";

export const Payments = () => {
    const { t } = useTranslation();
    const { data: stats, isPending } = useTeacherStats();
    const [filter, setFilter] = useState(t("teacher.all"));

    const statCards = [
        {
            title: t("teacher.paid"),
            amount: stats?.paid?.amount || 0,
            count: stats?.paid?.count || 0,
            color: "text-emerald-600 dark:text-emerald-400",
            bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
            borderColor: "border-emerald-200 dark:border-emerald-500/20",
            icon: TrendingUp,
            iconColor: "text-emerald-500",
            countLabel: t("teacher.payment_count"),
        },
        {
            title: t("teacher.unpaid"),
            amount: stats?.unpaid?.amount || 0,
            count: stats?.unpaid?.count || 0,
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-50 dark:bg-orange-500/10",
            borderColor: "border-orange-200 dark:border-orange-500/20",
            icon: TrendingDown,
            iconColor: "text-orange-500",
            countLabel: t("teacher.lesson_count"),
        },
        {
            title: t("teacher.cancelled"),
            amount: stats?.cancelled?.amount || 0,
            count: stats?.cancelled?.count || 0,
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-50 dark:bg-red-500/10",
            borderColor: "border-red-200 dark:border-red-500/20",
            icon: XCircle,
            iconColor: "text-red-500",
            countLabel: t("teacher.payment_count"),
        },
    ];

    if (isPending) return <PaymentsSkeleton />;

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {t("teacher.payments")}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {t("teacher.payments_subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className={cn(
                                "bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 space-y-6 group",
                                card.borderColor
                            )}
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {card.title}
                                        </span>
                                    </div>
                                </div>
                                <div className={cn(
                                    "p-2 rounded-lg group-hover:scale-110 transition-transform",
                                    card.bgColor
                                )}>
                                    <Icon className={cn("w-5 h-5", card.iconColor)} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <DollarSign className={cn("w-5 h-5", card.color)} />
                                    <h2 className={cn("text-3xl font-bold", card.color)}>
                                        {card.amount.toLocaleString()}
                                    </h2>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-500 font-medium pl-7">
                                    {card.count} {card.countLabel}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6 transition-colors">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {t("teacher.payment_history")}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {t("teacher.payment_list")}
                    </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {[t("teacher.all"), t("teacher.paid"), t("teacher.cancelled")].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setFilter(item)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                filter === item
                                    ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-2xl rounded-full"></div>
                        <div className="relative w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                            <Wallet className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                            {t("teacher.no_payments")}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
                            {t("teacher.empty_list")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
