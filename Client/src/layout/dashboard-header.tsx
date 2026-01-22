import { SidebarTrigger } from "../components/ui/sidebar"
import { ThemeToggle } from "../components/theme-toggle"
import { LanguageToggle } from "../components/language-toggle"

export function DashboardHeader() {
    return (
        <div className="p-3 border-b flex items-center justify-between">
            <SidebarTrigger className="cursor-pointer border border-black dark:border-white p-2" />
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </div>
    )
}
