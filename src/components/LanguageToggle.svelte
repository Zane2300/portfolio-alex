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

<button
    type="button"
    class="relative inline-flex items-center w-20 h-7 rounded-full border border-bg-selection bg-bg-elevated/70 text-[11px] font-medium text-text-muted hover:border-primary transition-colors"
    on:click={() => go(lang === "en" ? "es" : "en")}
>
    <span
        class={`absolute top-1/2 -translate-y-1/2 left-0.5
            h-5 w-9 rounded-full
            bg-primary shadow shadow-primary/30
            transition-transform duration-200
            ${lang === "en" ? "" : "translate-x-9"}`}
    ></span>

    <!-- EN / ES -->
    <span class={`relative z-10 flex-1 text-center ${lang === "en" ? "text-text" : "text-text-muted"}`}>
        EN
    </span>
    <span class={`relative z-10 flex-1 text-center ${lang === "es" ? "text-text" : "text-text-muted"}`}>
        ES
    </span>
</button>
