<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { EventsOn, Quit, WindowIsMaximised, WindowMinimise, WindowToggleMaximise } from '../../wailsjs/runtime/runtime.js'

defineProps({
    title: {
        type: String,
        required: false
    }
})

const isMaximized = ref(false)
const isMacos = ref(false)
try {
    const userAgent = navigator.userAgent;
    console.log('userAgent', userAgent)
    if (userAgent.match(/Mac/)) {
        isMacos.value = true
    }
} catch (error) { }

EventsOn('window_changed', (info) => {
    // const { fullscreen, maximised } = info 
    const { maximised } = info
    isMaximized.value = maximised
    console.log('isMaximized', maximised, (window as any).wails)
})

onMounted(async () => {
    // const fullscreen = await WindowIsFullscreen() 
    const maximised = await WindowIsMaximised()
    isMaximized.value = maximised
})
</script>

<template>
    <Teleport to="body">
        <div class="draggable titlebar" style="--wails-draggable: drag" @dblclick="WindowToggleMaximise">
            <div v-if="!isMacos" class="titlebar__icon"></div>
            <div v-else class="spacer"></div>
            <div>{{ title }}</div>
            <div class="titlebar__slot">
                <slot></slot>
            </div>
            <button v-if="!isMacos" class="nodrag titlebar__sys-btn" @click="WindowMinimise">
                <svg viewBox="0 0 32 32" width="32">
                    <line x1="10" y1="15.5" x2="22" y2="15.5" />
                </svg>
            </button>
            <button v-if="!isMacos" class="nodrag titlebar__sys-btn" @click="WindowToggleMaximise">
                <svg v-if="isMaximized" viewBox="0 0 32 32" width="32">
                    <rect x="11" y="13" width="8" height="8" />
                    <polyline points="13,13 13,11 21,11 21,19 19,19" />
                </svg>
                <svg v-else viewBox="0 0 32 32" width="32">
                    <rect x="11" y="11" width="10" height="10" />
                </svg>
            </button>
            <button v-if="!isMacos" class="nodrag titlebar__sys-btn titlebar__close" @click="Quit">
                <svg viewBox="0 0 32 32" width="32">
                    <line x1="11" y1="11" x2="21" y2="21" />
                    <line x1="11" y1="21" x2="21" y2="11" />
                </svg>
            </button>
        </div>
    </Teleport>
</template>

<style lang="css">
.titlebar {
    z-index: 10;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    /* background-color: red; */
}

.titlebar__sys-btn {
    appearance: none;
    outline: none;
    border: none;
    background-color: var(--color-titlebar-btn-back);
    transition: background-color 0.5s ease;
    height: 100%;
    shape-rendering: crispEdges;
}

.os-mac .titlebar {
    height: 38px;
    justify-content: center;
    /* padding-left: 74px; */
}

.os-mac .titlebar__sys-btn {
    display: none;
}

.titlebar__icon {
    width: 16px;
    height: 16px;
    pointer-events: none;
    margin: 0 6px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@assets/images/logo-universal.png');
}

.titlebar__slot {
    flex: 1;
}

.os-mac .titlebar__slot {
    flex: 0;
}

.titlebar .titlebar__sys-btn:hover {
    background-color: var(--color-titlebar-btn-back-hover);
}

.titlebar__sys-btn svg {
    stroke: var(--color-text);
    stroke-width: 1px;
    fill: none;
}

.titlebar__close {
    /* shape-rendering: geometricPrecision !important; */
}

.titlebar__close:hover {
    background-color: var(--color-titlebar-btn-close-hover) !important;
}

.titlebar__close svg {
    stroke-width: 1px;
}

/* 
@media (prefers-color-scheme: light) {
    .titlebar__close-svg {
        stroke-width: 1px !important;
    }
}

@media (prefers-color-scheme: dark) {
    .titlebar__close-svg {
        stroke-width: 1.25px !important;
    }
} */
</style>
