<template>
    <button @click="modalVisible = true"
        class="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Edit Text
    </button>
    <div :class="{ hidden: !modalVisible }" id="defaultModal" tabindex="-1" aria-hidden="false"
        class="fixed top-0 left-0 right-0 z-50 w-screen overflow-x-hidden overflow-y-auto h-screen flex place-items-center justify-center bg-gray-500/50 dark:bg-gray-900/50">
        <div
            class="bg-gray-70 bg-white dark:bg-gray-700 w-[50rem] h-[50rem] flex flex-col justify-center border-2 border-solid border-slate-100 dark:border-slate-950">

            <div class="px-4 py-3">
                <div class="flex gap-4 justify-center text-black">
                    <Selectic v-if="fontAvailable.length > 0" :options="fontAvailable" ref="fontFamily"
                        :value="props.text.fontFamily()" :params="{
                            formatOption: (option: any) => {
                                return Object.assign({}, option, {
                                    style: 'font-family: ' + option.id + ';'
                                });
                            },
                            formatSelection: (option: any) => {
                                return Object.assign({}, option, {
                                    style: 'font-family: ' + option.id + ';'
                                });
                            },
                        }" @on-change="">
                    </Selectic>
                    <Selectic :value="props.text.fontSize()" :options="[
                        { id: 30, text: 'Klein' },
                        { id: 40, text: 'Normal' },
                        { id: 60, text: 'Groß' },
                        { id: 80, text: 'Riesig' },
                    ]" ref="fontSize" :params="{
    formatOption: (option: any) => Object.assign({}, option, {
        style: 'font-size: ' + option.id + ';'
    }),
    formatSelection: (option: any) => Object.assign({}, option, {
        style: 'font-size: ' + option.id + ';'
    }),
}" @on-change="">
                    </Selectic>
                    <Selectic :value="props.text.fontStyle()" :options="[
                        { id: 'normal', text: 'Normal', style: 'normal', weight: 'normal' },
                        { id: 'bold', text: 'Fett', style: 'normal', weight: 'bold' },
                        { id: 'italic', text: 'Kursiv', style: 'italic', weight: 'normal' },
                    ]" ref="fontStyle" :params="{
    formatOption: (option: any) => Object.assign({}, option, {
        style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
    }),
    formatSelection: (option: any) => Object.assign({}, option, {
        style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
    }),
}" @on-change="">
                    </Selectic>

                    <Selectic :value="props.text.align()" :options="[
                        { id: 'left', text: 'Links' },
                        { id: 'center', text: 'Mitte' },
                        { id: 'right', text: 'Rechts' },
                    ]" ref="align" :params="{
    formatOption: (option: any) => Object.assign({}, option, {
        style: 'text-align: ' + option.id + ';'
    }),
    formatSelection: (option: any) => Object.assign({}, option, {
        style: 'text-align: ' + option.id + ';'
    }),
}" @on-change="">
                    </Selectic>
                    <input ref="fill" :value="props.text.fill()" type="color" class="aspect-square w-min">
                </div>
                <div class="pt-6 text-black text-2xl">
                    <textarea ref="textarea" :value="props.text.text()" class="w-full min-h-[8rem] h-32"></textarea>
                </div>
            </div>
            <div class="px-4 py-4 flex justify-center">
                <button id="ok-btn" @click="renderText" class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-96 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2
                    focus:ring-green-300">
                    Text übernehmen
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Selectic from 'selectic';

let modalVisible = ref(false);
const props = defineProps(['text'])
let fontAvailable = [] as String[];
const textarea = ref();
const fontSize = ref();
const fontFamily = ref();
const fill = ref();
const align = ref();
const fontStyle = ref();

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
})


function renderText() {
    props.text.setText(textarea.value.value);
    props.text.fontSize(fontSize.value.getValue());
    props.text.fontFamily(fontFamily.value.getValue());
    props.text.fill(fill.value.value);
    props.text.align(align.value.getValue());
    props.text.fontStyle(fontStyle.value.getValue());

    modalVisible.value = false;
}

</script>


<style>
.ql-snow .ql-picker.ql-font .ql-picker-label {
    width: 200px;
}

.ql-container {
    font-size: inherit;
}
</style>