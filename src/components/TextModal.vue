<template>
    <Button @on-click="addText">Neuer Text</Button>
    <div v-if="text" id="defaultModal" tabindex="-1" aria-hidden="false" class="flex flex-col place-items-center">
        <TwoColumns>
            <label>Schriftart</label>
            <Selectic v-if="fontAvailable.length > 0" :options="fontAvailable" :value="text.fontFamily()" :params="{
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
            }" @change="(value: string) => text.fontFamily(value)">
            </Selectic>
            <label>Größe</label>
            <input :value="text.fontSize()" type="range" min="30" max="500" step="2"
                @input="event => text.fontSize((event.target as HTMLInputElement).valueAsNumber)" />
            <label>Style</label>
            <Selectic :value="text.fontStyle()" :options="[
                { id: 'normal', text: 'Normal', style: 'normal', weight: 'normal' },
                { id: 'bold', text: 'Fett', style: 'normal', weight: 'bold' },
                { id: 'italic', text: 'Kursiv', style: 'italic', weight: 'normal' },
            ]
                " ref="fontStyle" :params="{
        formatOption: (option: any) => Object.assign({}, option, {
            style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
        }),
        formatSelection: (option: any) => Object.assign({}, option, {
            style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
        }),
    }
        " @change="(value: string) => text.fontStyle(value)">
            </Selectic>
            <label>Farbe Text</label>
            <input :value="text.fill()" type="color" class="aspect-square w-min"
                @input="event => text.fill((event.target as HTMLInputElement).value)">
            <label>Stärke Umrandung</label>
            <input :value="text.strokeWidth()" type="range" min="0" max="20" step="1"
                @input="event => text.strokeWidth((event.target as HTMLInputElement).valueAsNumber)" />
            <label>Farbe Umrandung</label>
            <input :value="text.stroke()" type="color" class="aspect-square w-min"
                @input="event => text.stroke((event.target as HTMLInputElement).value)">
        </TwoColumns>
        <div class="pt-6 text-black text-2xl">
            <textarea :value="text.text()" class="w-full min-h-[8rem] h-32"
                @input="event => text.text((event.target as HTMLInputElement).value)"></textarea>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Selectic from 'selectic';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { useEventListener } from '@vueuse/core';
import Konva from 'konva';
import { useStageStore } from '../stores/stageStore';
import { TextData } from '../types/types';

const text = ref();
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
    useEventListener(document, 'selectedTextNode', (e: CustomEvent) => {
        text.value = e.detail;
    })
})

const store = useStageStore();
const texts = store.texts as TextData[];
function addText() {
    const lastText = texts[texts.length - 1];
    const id = (lastText?.id ?? 0) + 1;
    console.log(id);
    store.addText({
        id: id,
        text: new Konva.Text({
            x: 200,
            y: 600,
            text: "Viele Grüße",
            fontSize: 80,
            fontFamily: 'Arial',
            fill: '#555555',
            width: 300,
            padding: 5,
            align: 'center',
            stroke: '#ffffff',
            strokeWidth: 0,
            draggable: true,
        }).setAttr('textId', id).on('transform', ($event) => {
            const text = $event.currentTarget as Konva.Text;
            text.setAttrs({
                width: Math.max(text.width() * text.scaleX(), 20),
                height: Math.max(text.height() * text.scaleY(), 20),
                scaleX: 1,
                scaleY: 1,
            });
        }),
    });
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