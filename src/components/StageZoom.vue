<template>
    <div class="fixed bottom-2 dark:text-white gap-2 bg-gray-300 dark:bg-gray-800 p-2 rounded-lg flex justify-around">
        <div class="w-6 hover:cursor-pointer" @click="stageZoom(-0.1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
            </svg>
        </div>
        <div class="w-6 hover:cursor-pointer" @click="stageZoom(0.1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
        </div>
        <div></div>
        <div class="w-6 hover:cursor-pointer" @click="undo()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
        </div>
        <div class="w-6 hover:cursor-pointer" @click="redo()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { loadImages } from '../helper/imageHelper';
import stageZoom from '../helper/stageZoom';
import { reloadTexts } from '../helper/textHelper';
import { usePersistentStore } from '../stores/persistentStore';

function undo() {
    if (usePersistentStore().undo()) {
        reloadTexts();
        loadImages();
    }
}
function redo() {
    if (usePersistentStore().redo()) {
        reloadTexts();
        loadImages();
    }
}
</script>