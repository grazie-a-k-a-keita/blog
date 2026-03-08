import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const [theme, setThemeState] = React.useState<"theme-light" | "dark">(
		"theme-light",
	);

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "theme-light");
	}, []);

	React.useEffect(() => {
		const isDark = theme === "dark";
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
	}, [theme]);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() =>
				setThemeState((prev) =>
					prev === "theme-light" ? "dark" : "theme-light",
				)
			}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
