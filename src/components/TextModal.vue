<template>
    <div>
        <div v-if="text" id="defaultModal" tabindex="-1" aria-hidden="false" class="flex flex-col place-items-center">
            <hr class="w-full">
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
                }" @change="(value: string) => text?.fontFamily(value) && update()">
                </Selectic>
                <label>Größe</label>
                <input :value="text.fontSize()" type="range" min="30" max="500" step="2"
                    @input="event => text?.fontSize((event.target as HTMLInputElement).valueAsNumber)"
                    @change="update()" />
                <label>Style</label>
                <Selectic :value="text.fontStyle()" :options="[
                    { id: 'normal', text: 'Normal', style: 'normal', weight: 'normal' },
                    { id: 'bold', text: 'Fett', style: 'normal', weight: 'bold' },
                    { id: 'italic', text: 'Kursiv', style: 'italic', weight: 'normal' },
                ]
                    " :params="{
                        formatOption: (option: any) => Object.assign({}, option, {
                            style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
                        }),
                        formatSelection: (option: any) => Object.assign({}, option, {
                            style: 'font-weight: ' + option.weight + ';font-style: ' + option.style + ';'
                        }),
                    }
                        " @change="(value: string) => text?.fontStyle(value) && update()">
                </Selectic>
                <label>Farbe Text</label>
                <input :value="text.fill()" type="color" class="aspect-square w-min"
                    @input="event => text?.fill((event.target as HTMLInputElement).value)" @change="update()">
                <label>Stärke Umrandung</label>
                <input :value="text.strokeWidth()" type="range" min="0" max="20" step="1"
                    @input="event => text?.strokeWidth((event.target as HTMLInputElement).valueAsNumber)"
                    @change="update()" />
                <label>Farbe Umrandung</label>
                <input :value="text.stroke()" type="color" class="aspect-square w-min"
                    @input="event => text?.stroke((event.target as HTMLInputElement).value)" @change="update()">
                <div class="col-span-2 text-black text-2xl">
                    <textarea :value="text.text()" class="w-full min-h-[8rem] h-32"
                        @input="event => text?.text((event.target as HTMLInputElement).value)"
                        @change="update()"></textarea>
                </div>
                <Button class="col-span-2" type="danger" @on-click="destroyText">Text löschen</Button>
            </TwoColumns>
            <hr class="w-full">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import Selectic from 'selectic';
import TwoColumns from './TwoColumns.vue';
import Button from './Button.vue';
import { useStageStore } from '../stores/stageStore';
import { usePersistentStore } from '../stores/persistentStore';
import Konva from 'konva';
import attachNodeToTransformer from "../helper/attachNodeToTransformer";

let fontAvailable = [] as String[];
const emit = defineEmits(['reloadTexts']);

const text = computed(() => {
    const node = useStageStore().selectedNode;
    if (node instanceof Konva.Text) {
        return node;
    }
})

function update() {
    const node = text.value;
    if (node) {
        usePersistentStore().updateText(node.id(), node.toJSON())
    }
}

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

function destroyText() {
  const node = text.value;
  if (node) {
    const stage = useStageStore().stage as Konva.Stage;
    attachNodeToTransformer(stage.getLayers(), undefined)
    usePersistentStore().destroyText(node.id())
    node.destroy();
  }
  emit('reloadTexts');
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