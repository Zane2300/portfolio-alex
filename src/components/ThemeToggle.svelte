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

        try {
            localStorage.setItem("theme", next);
        } catch (e) {
            /* modo privado o storage bloqueado: el tema se aplica igual, no persiste */
        }

        theme = next;
    }

    function toggleTheme() {
        const next: Theme = theme === "dark" ? "light" : "dark";
        applyTheme(next);
    }

    onMount(() => {
        // El tema ya lo ha aplicado el script anti-FOUC del layout; aquí solo se lee
        // el estado real del DOM para que el botón arranque con la etiqueta correcta.
        theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
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
        class:bg-yellow={theme === "light"}
    >
    </span>
    <span>{theme === "dark" ? "Dark" : "Light"}</span>
</button>
