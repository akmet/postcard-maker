import Konva from 'konva'
import { defineStore } from 'pinia'

export const useStagesStore = defineStore('stages', {
    state: () => {
        return {
            stages: [] as Konva.Stage[],
        }
    }
})