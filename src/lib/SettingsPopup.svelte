<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        content: Snippet;
    }
    let { content }: Props = $props();

    let active = $state(false);
    let activeTimer: number | null = null;

    let showContent = $state(false);

    const onMouseMove = () => {
        console.log("onMouseMove")
        active = true;
        if (showContent) return
        if (activeTimer) {
            clearTimeout(activeTimer);
        }
        activeTimer = setTimeout(() => {
            active = false;
            console.log("mouse move timeout")
        }, 3000);
    };

    const onButtonClick = () => {
        showContent = true
        if (activeTimer) {
            clearTimeout(activeTimer);
        }        
    }

    const onMouseLeave = () => {
        if (activeTimer) {
            clearTimeout(activeTimer);
        }        
        activeTimer = setTimeout(() => {
            showContent = false
            active = false;
            console.log("mouse leave timeout")
        }, 3000);
    };

    const onMouseEnter = () => {
        if (activeTimer) {
            clearTimeout(activeTimer);
        }        
    };

    const onClick = (e:MouseEvent) => {
        console.log(e)
        if (e.target instanceof Element) {
            if (e.type == "click" && (e.target as Element).tagName == "BUTTON") {
                showContent = false
            }
        }
    }
</script>

<svelte:window onmousemove={onMouseMove} />

{#if active}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="popup" onmouseleave={onMouseLeave} onmouseenter={onMouseEnter}>
        {#if showContent}
        <div onclickcapture={onClick}>
            {@render content()}
        </div>
        {:else}
            <button
                type="button"
                onclick={onButtonClick}>Settings</button
            >
        {/if}
    </div>
{/if}

<style>
    .popup {
        z-index: 9999;
        position: absolute;
        bottom: 1em;
        right: 1em;
    }
</style>
