<template>
    <dialogComponent 
        :dialogClicked="dialogClicked" 
        @on-close="onClose" 
        :use-actions="false"
        :disable-function="isColorSelected"
        @on-apply="applyColor"
        @apply-for-all="applyForAll">
        <template v-slot:title>
            <p>{{ title }}</p>
        </template>
        <template v-slot:item>
            <colorPicker @on-pick-color="onPickColor" />
        </template>
    </dialogComponent>
</template>

<script setup lang="ts">
import dialogComponent from './dialog-component.vue';
import { DialogProps } from "@/enums/dialog-prop"
import colorPicker from './color-picker.vue';

let color = ref("")

const title = "Cor da Fonte"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const isColorSelected = computed(() => !!color.value)

const { dialogClicked } = toRefs(props)
const emit = defineEmits(["onClose", "onApply", "applyForAll"])

function onPickColor(colorPicked : string) {
    color.value = colorPicked
}

function applyColor() {
    emit("onApply", {
        prop: DialogProps.FONT_COLOR,
        value: color.value
    })
    onClose()
}

function applyForAll() {
    emit("applyForAll", {
        prop: DialogProps.FONT_COLOR,
        value: color.value
    })
    onClose()
}

function onClose() {
    emit("onClose", DialogProps.FONT_COLOR)
}
</script>

<style scoped>

</style>