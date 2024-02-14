import { defineStore } from 'pinia'
import TextToImage from "@/service/textToImage";

export const useInputsStore = defineStore('inputs', {
    state: () => {
        return {
            inputs: [{text: "", options: TextToImage.getInitialOptions()}],
            actualIndexOnEdit: 0,
            tab: 1
        }
    },
    getters: {
        getInputs: (state) => state.inputs,
        doesHaveTheMaxInputs: (state) => state.inputs.length == 12,
        doesHaveMoreThanOneInput: (state) => state.inputs.length > 1,
        getActualIndexOnEdit: (state) => state.actualIndexOnEdit,
        getActualPropValueOnEdit: (state) => { return (prop: string) => state.inputs[state.actualIndexOnEdit].options[prop] },
        getActualStyleOptions: (state) => state.inputs[state.actualIndexOnEdit].options,
        getActualTab: (state) => state.tab
    },
    actions: {
        addInput() {
            if (!this.doesHaveTheMaxInputs) {
                this.inputs.push({text: "", options: TextToImage.getStyleOptions(this.getActualStyleOptions)})
            }
        },
        removeInputByIndex(index: number) {
            if (this.doesHaveMoreThanOneInput) {
                this.inputs.splice(index, 1)
            }
        },
        updateActualIndex(index: number) {
            this.actualIndexOnEdit = index
        },
        updateStyleOption(value: string | number | boolean | Array<any>, prop: string) {
            this.inputs[this.getActualIndexOnEdit].options[prop] = value
        },
        updateStyleOptionForAll(prop: string) {
            this.inputs.forEach((i) => i.options[prop] = this.getActualPropValueOnEdit(prop))
        },
        updateTab(value: number) {
            this.tab = value
        }
    }
})