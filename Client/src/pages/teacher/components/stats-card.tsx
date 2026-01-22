import { Card } from "../../..//components/ui/card";
import type { StatsCardProps } from "../../auth/admin-type";

export const StatsCard = ({
    label,
    value,
    icon: Icon,
    iconColor,
    labelColor,
}: StatsCardProps) => (
    <Card className="flex items-start justify-between p-6 bg-white dark:bg-slate-900 border-none shadow-sm hover:shadow-md transition-all group">
        <div className="space-y-1">
            <p className={`text-xs font-semibold uppercase ${labelColor}`}>
                {label}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${iconColor}`}>
            <Icon className="w-6 h-6" />
        </div>
    </Card>
);
