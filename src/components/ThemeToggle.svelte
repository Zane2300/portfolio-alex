<script lang="ts">
    import { onMount } from "svelte";

    type Theme = "light" | "dark";

    export let toLightLabel: string = "Switch to light theme";
    export let toDarkLabel: string = "Switch to dark theme";

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

<!--
    Píldora deslizante, mismo patrón de dimensionado que LanguageToggle.svelte (track
    p-1 + overflow-hidden, thumb inset-y-1/left-1/calc(50%-4px)/translate-x-full) y
    mismas medidas de track (w-20 h-7) para que ambos controles se alineen en la barra.
    Sol y luna van SIEMPRE visibles; el thumb se desliza sobre el icono del tema activo
    (no del destino) — mismo criterio que el segmento activo del toggle de idioma.
-->
<button
    type="button"
    class="relative inline-flex w-20 h-7 items-center overflow-hidden rounded-full border border-bg-selection bg-bg-elevated/70 p-1 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    aria-label={theme === "dark" ? toLightLabel : toDarkLabel}
    on:click={toggleTheme}
>
    <span
        class={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full
            bg-primary-surface
            transition-transform duration-200
            ${theme === "dark" ? "translate-x-full" : ""}`}
    ></span>

    <span class="relative z-10 grid h-full w-full grid-cols-2">
        <!-- Sol: tema claro -->
        <span class={`flex items-center justify-center ${theme === "light" ? "text-bg" : "text-text-muted"}`}>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
        </span>
        <!-- Luna: tema oscuro -->
        <span class={`flex items-center justify-center ${theme === "dark" ? "text-bg" : "text-text-muted"}`}>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
        </span>
    </span>
</button>
