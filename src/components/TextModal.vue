<template>
    <button @click="showModal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Add Text
    </button>
    <div v-if="props.showModal" id="defaultModal" tabindex="-1" aria-hidden="false"
        class="fixed top-0 left-0 right-0 z-50 w-screen overflow-x-hidden overflow-y-auto h-screen flex place-items-center justify-center bg-gray-500/50 dark:bg-gray-900/50">
        <div
            class="bg-gray-70 bg-white dark:bg-gray-700 w-[50rem] h-[50rem] flex flex-col justify-center border-2 border-solid border-slate-100 dark:border-slate-950">

            <div class="px-4 py-3">
                <div class="bg-white">
                    <div id="editor-container" class="h-96"></div>
                </div>
            </div>
            <div class="px-4 py-4">
                <button id="ok-btn" class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-96 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2
                    focus:ring-green-300">
                    Text übernehmen
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
//import html2canvas from 'html2canvas';
import "../fonts.css"

const props = defineProps(['showModal'])
let fontAvailable = [] as String[];

onMounted(async () => {
    //getFonts();
    const fontCheck = new Set([
        // Windows 10
        'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia',
        'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact',
        'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya',
        'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei',
        'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype',
        'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun',
        'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
        // macOS
        'Apple Chancery', 'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS',
        'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps',
        'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate',
        'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue',
        'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy',
        'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman',
        'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
    ].sort());

    await document.fonts.ready;
    for (const font of fontCheck.values()) {
        if (document.fonts.check(`12px "${font}"`)) {
            fontAvailable.push(font);
        }
    }
    console.log('Available Fonts:', fontAvailable);



})

function showModal() {
    console.log("showModal");
    let fonts = Quill.import("attributors/style/font");
    Quill.register(fonts, true);
    fonts.whitelist = fontAvailable;
    new Quill('#editor-container', {
        modules: {
            toolbar: [
                [
                    { 'size': ['small', false, 'large', 'huge'] },
                    'bold',
                    'italic',
                    'underline',
                    { 'color': [] },
                    { 'align': [] },
                    { 'font': fonts.whitelist },
                ],
            ],
        },
        theme: 'snow',
    });
}
/*
function renderText() {
    let editor = document.getElementById('.ql-editor');
    if (!editor) {
        console.log("could not find quill editor");
        return;
    }
    html2canvas(editor, {
        backgroundColor: 'rgba(0,0,0,0)',
    }).then((canvas) => {
        shape.image(canvas);
    });
}
*/
</script>


<style>
.ql-snow .ql-picker.ql-font .ql-picker-label {
    width: 200px;
}
</style>