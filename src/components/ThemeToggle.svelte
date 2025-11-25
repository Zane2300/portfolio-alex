<script lang="ts">
    import { onMount } from "svelte";

    type Theme = "light" | "dark";
    let theme: Theme = "dark";

    function applyTheme(next: Theme) {
        const root = document.documentElement;

        if (next === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", next);
        theme = next;
    }

    function toggleTheme() {
        const next: Theme = theme === "dark" ? "light" : "dark";
        applyTheme(next);
    }

    onMount(() => {
        const stored = localStorage.getItem("theme") as Theme | null;

        if (stored === "light" || stored === "dark") {
            applyTheme(stored);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(prefersDark ? "dark" : "light");
        }
    });
</script>

<button
    type="button"
    class="inline-flex items-center gap-2 rounded-full border border-bg-selection bg-bg-elevated/70 px-4 py-1.5 text-xs font-medium text-text-muted hover:border-primary hover:text-primary transition-colors"
    on:click={toggleTheme}
>
    <span 
        class="inline-block h-2 w-2 rounded-full"
        class:bg-primary={theme === "dark"}
        class:bg-yellow-300={theme === "light"}
    >
    </span>
    <span>{theme === "dark" ? "Dark" : "Light"}</span>
</button>
