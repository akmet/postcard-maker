<template>
  <FileDrop :text="'Bild ' + props.item + ' hochladen'" :identifier="'dropzone-file-' + props.item"
    @some-event="fileDropped">
  </FileDrop>

  <teleport to="#modals">
    <div v-if="isShowModal" class="bg-gray-200 dark:bg-gray-900 h-screen w-screen p-auto flex justify-center ">
      <div class="flex-col content-center max-h-full max-w-full flex">
        <div class="h-3/4 w-3/4">
          <VuePictureCropper :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            margin: 'auto',
          }" :img="pic" :options="{
  viewMode: 1,
  dragMode: 'crop',
  aspectRatio: 437 / 310,
}" />
        </div>
        <div class="flex justify-center gap-4 py-4">
          <Button type="danger"
            @click="isShowModal = false"
          >
            Abbrechen
          </Button>
          <Button
              type="green"
              @click="getResult">
            Zuschneiden
          </Button>
          <Button
              @click="cropper!.rotate(-90)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 scale-x-[-1]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
          </Button>
          <Button
              @click="cropper!.rotate(90)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { createImage } from '../helper/imageHelper';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import FileDrop from './FileDrop.vue';
import { reactive, ref } from 'vue';
import Button from "./Button.vue";
const props = defineProps(['item'])


const isShowModal = ref<boolean>(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const pic = ref<string>('')
const result = reactive({
  dataURL: '',
  blobURL: '',
})

function fileDropped(event: Event) {
  if (event.target instanceof HTMLInputElement) {

    // Reset last selection and results
    pic.value = ''
    result.dataURL = ''
    result.blobURL = ''

    // Get selected files
    const { files } = event.target as HTMLInputElement
    if (!files || !files.length) return

    // Convert to dataURL and pass to the cropper component
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // Update the picture source of the `img` prop
      pic.value = String(reader.result)

      // Show the modal
      isShowModal.value = true

      // Clear selected files of input element
      if (!uploadInput.value) return
      uploadInput.value.value = ''
    }
  }
}

/**
 * Get cropping results
 */
function getResult() {
  if (!cropper) {
    return
  }

  const base64 = cropper.getDataURL({
    width: 874 * 1.5,
    height: 620 * 1.5,
  })

  isShowModal.value = false
  createImage(base64, props.item)
}
</script>
<style></style>