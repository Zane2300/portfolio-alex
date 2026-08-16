<script lang="ts">
    import { onMount, onDestroy, tick } from "svelte";

    type LinkItem = { href: string; label: string };

    export let links: LinkItem[] = [];
    export let menuOpenLabel: string = "Open menu";
    export let menuCloseLabel: string = "Close menu";
    // GitHub/LinkedIn se repiten aquí solo para el panel móvil: en la barra (≥640px)
    // se renderizan como HTML estático en NavBar.astro para no tirar de JS en algo
    // que no lo necesita.
    export let githubUrl: string = "";
    export let githubLabel: string = "GitHub";
    export let linkedinUrl: string = "";
    export let linkedinLabel: string = "LinkedIn";

    let activeHref: string = links[0]?.href ?? "";
    let isOpen = false;
    let panelEl: HTMLDivElement | undefined;
    let toggleBtn: HTMLButtonElement | undefined;
    let observer: IntersectionObserver | null = null;

    // Mueve su contenido a <body> al montar: la pill de la navbar tiene backdrop-blur,
    // y un ancestro con filter/backdrop-filter se convierte en containing block de sus
    // descendientes `position: fixed` (spec CSS), lo que rompería el drawer fijo al
    // viewport. Sacarlo de ahí con un portal es la forma correcta de evitarlo.
    function portal(node: HTMLElement) {
        document.body.appendChild(node);
        return {
            destroy() {
                node.remove();
            },
        };
    }

    function sectionId(href: string) {
        return href.replace("#", "");
    }

    // El offset de la franja de disparo se mide en el <header> sticky real (nav +
    // toggles), no se hardcodea: si la navbar cambia de alto (p.ej. hace flex-wrap
    // en pantallas intermedias) el scrollspy se sigue disparando en el sitio correcto.
    function setupObserver() {
        if (typeof IntersectionObserver === "undefined") return;

        const header = document.querySelector("header");
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const topOffset = Math.ceil(headerHeight) + 16;

        const sections = links
            .map((l) => document.getElementById(sectionId(l.href)))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length === 0) return;
                const topmost = visible.reduce((a, b) =>
                    a.boundingClientRect.top < b.boundingClientRect.top ? a : b
                );
                activeHref = `#${topmost.target.id}`;
            },
            {
                root: null,
                rootMargin: `-${topOffset}px 0px -60% 0px`,
                threshold: 0,
            }
        );

        sections.forEach((s) => observer?.observe(s));
    }

    function closeMenu() {
        isOpen = false;
    }

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function handleLinkClick() {
        closeMenu();
    }

    function handleWindowKeydown(e: KeyboardEvent) {
        if (!isOpen) return;

        if (e.key === "Escape") {
            e.preventDefault();
            closeMenu();
            toggleBtn?.focus();
            return;
        }

        if (e.key === "Tab" && panelEl) {
            const focusables = panelEl.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    $: if (isOpen) {
        tick().then(() => {
            panelEl?.querySelector<HTMLElement>("a[href]")?.focus();
        });
    }

    // Bloquea el scroll del body mientras el drawer está abierto, lo restaura al
    // cerrar sea cual sea la vía (enlace, backdrop, Escape o el propio botón).
    $: if (typeof document !== "undefined") {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    onMount(() => {
        setupObserver();
    });

    onDestroy(() => {
        observer?.disconnect();
    });
</script>

<svelte:window on:keydown={handleWindowKeydown} />

<!-- DESKTOP LINKS: sin flex-1/justify-center, se quedan pegados al logo en vez de
     flotar centrados en el hueco sobrante de una barra ancha -->
<ul
    class="hidden sm:flex flex-wrap items-center
        gap-x-5 gap-y-1 text-sm font-medium text-text-muted"
>
    {#each links as link (link.href)}
        <li>
            <a
                href={link.href}
                class={`relative inline-block rounded pb-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    activeHref === link.href ? "text-primary" : ""
                }`}
                aria-current={activeHref === link.href ? "location" : undefined}
            >
                {link.label}
                {#if activeHref === link.href}
                    <span class="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"></span>
                {/if}
            </a>
        </li>
    {/each}
</ul>

<!-- MOBILE: hamburguesa -->
<button
    bind:this={toggleBtn}
    type="button"
    class="sm:hidden inline-flex items-center justify-center rounded-full border border-bg-selection bg-bg-elevated/70 p-2 text-text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    aria-expanded={isOpen}
    aria-controls="mobile-nav-panel"
    aria-label={isOpen ? menuCloseLabel : menuOpenLabel}
    on:click={toggleMenu}
>
    {#if isOpen}
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    {:else}
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
        </svg>
    {/if}
</button>

<!-- MOBILE: drawer off-canvas. Portado a <body>, SIEMPRE en el DOM (oculto con
     translate-x + inert/aria-hidden, no desmontado) para que aria-controls nunca
     quede colgando. -->
<div use:portal>
    <!-- BACKDROP: clic cierra -->
    <div
        class={`sm:hidden fixed inset-0 z-40 bg-bg-dark/70 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        on:click={closeMenu}
    ></div>

    <!-- DRAWER: ~80% de ancho, máx. 320px, alto completo, desde la derecha -->
    <div
        id="mobile-nav-panel"
        bind:this={panelEl}
        role="dialog"
        aria-modal="true"
        aria-label={menuOpenLabel}
        aria-hidden={!isOpen}
        inert={isOpen ? undefined : true}
        class={`sm:hidden fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-[320px] flex-col overflow-y-auto border-l border-bg-selection bg-bg-elevated shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-transform duration-300 motion-reduce:transition-none ${
            isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
        <div class="flex items-center justify-between border-b border-bg-selection p-4">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-surface text-xs font-bold text-bg">
                AR
            </span>
            <button
                type="button"
                aria-label={menuCloseLabel}
                class="inline-flex items-center justify-center rounded-full border border-bg-selection p-2 text-text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                on:click={closeMenu}
            >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
        </div>

        <ul class="flex flex-col gap-1 p-4 text-sm font-medium text-text-muted">
            {#each links as link (link.href)}
                <li>
                    <a
                        href={link.href}
                        class={`flex min-h-11 items-center rounded-xl px-3 transition-colors hover:bg-bg-dark/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            activeHref === link.href ? "text-primary" : ""
                        }`}
                        aria-current={activeHref === link.href ? "location" : undefined}
                        on:click={handleLinkClick}
                    >
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>

        <div class="mt-auto flex items-center gap-3 border-t border-bg-selection p-4">
            <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-bg-selection text-xs text-text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.95c.58.1.79-.25.79-.56v-1.96c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.29-.52-1.46.12-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.58.24 2.75.12 3.04.75.8 1.2 1.82 1.2 3.08 0 4.43-2.69 5.4-5.25 5.68.41.36.77 1.1.77 2.22v3.29c0 .31.2.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                {githubLabel}
            </a>
            <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-bg-selection text-xs text-text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.96 0-1.73-.79-1.73-1.76s.77-1.76 1.73-1.76 1.73.79 1.73 1.76-.77 1.76-1.73 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.55v5.65z" />
                </svg>
                {linkedinLabel}
            </a>
        </div>
    </div>
</div>
