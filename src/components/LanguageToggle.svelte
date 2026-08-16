<script lang="ts">
    import { onMount } from "svelte";

    type Lang = "en" | "es";

    export let lang: Lang = "en";
    const base = "/portfolio-alex";
    const SCROLL_KEY = "portfolio-scroll-y";

    function go(next: Lang) {
        if (next === lang) return;

        const currentY = window.scrollY || window.pageYOffset || 0;

        try {
            sessionStorage.setItem(SCROLL_KEY, String(currentY));
        } catch {
            //
        }

        const target = next === "en" ? `${base}/` : `${base}/es/`;
        window.location.href = target;
    }

    onMount(() => {
        try {
            const saved = sessionStorage.getItem(SCROLL_KEY);
            if (saved) {
                const y = Number(saved);
                if (!Number.isNaN(y)) {
                    window.scrollTo({
                        top: y,
                        behavior: "auto"
                    });
                }
                sessionStorage.removeItem(SCROLL_KEY);
            }
        } catch {
            //
        }
    });
</script>

<!--
    Patrón de dimensionado (compartido con ThemeToggle.svelte, no lo reinventes ahí):
    - Track: relative, padding fijo p-1, border, overflow-hidden como red de seguridad.
    - Thumb: absolute, inset-y-1 (así la altura sale sola: alto del track - 2*4px, sin
      hardcodear un h-X que pueda desajustarse con el borde), left-1, ancho
      calc(50% - 4px) — el 50% es del padding-box del track, los 4px descuentan el
      margen que deja `left-1` a un lado y el simétrico al otro.
    - translate-x-full mueve el thumb exactamente su propio ancho: siempre encaja,
      no depende de un valor en px recalculado a mano.
-->
<button
    type="button"
    class="relative inline-flex w-20 h-7 items-center overflow-hidden rounded-full border border-bg-selection bg-bg-elevated/70 p-1 text-[11px] font-medium transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    on:click={() => go(lang === "en" ? "es" : "en")}
>
    <span
        class={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full
            bg-primary-surface
            transition-transform duration-200
            ${lang === "es" ? "translate-x-full" : ""}`}
    ></span>

    <!-- EN / ES: grid de 2 columnas iguales, texto sobre el thumb en text-bg para contraste garantizado -->
    <span class="relative z-10 grid h-full w-full grid-cols-2">
        <span class={`flex items-center justify-center ${lang === "en" ? "text-bg font-semibold" : "text-text-muted"}`}>
            EN
        </span>
        <span class={`flex items-center justify-center ${lang === "es" ? "text-bg font-semibold" : "text-text-muted"}`}>
            ES
        </span>
    </span>
</button>
