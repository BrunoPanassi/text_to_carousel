<template>
    <dialogComponent 
        :dialogClicked="dialogClicked" 
        @on-close="onClose" 
        :use-actions="false"
        :disable-function="isFontSelected"
        @on-apply="onApply"
        @apply-for-all="applyForAll">
        <template v-slot:title>
            {{ title }}
        </template>
        <template v-slot:item>
            <v-select :items="fonts" v-model="fontSelected"></v-select>
        </template>
    </dialogComponent>
</template>

<script setup lang="ts">
import dialogComponent from './dialog-component.vue';
import { DialogProps } from "@/enums/dialog-prop"

const title = "Fonte"

let fonts = [
    "Arial",
    "Sans"
]

let fontSelected = ref("Arial")

const isFontSelected = computed(() => !!fontSelected.value)

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const { dialogClicked } = toRefs(props)

const emit = defineEmits(["onClose", "onApply", "applyForAll"])

function onApply() {
    emit("onApply", {
        prop: DialogProps.FONT_FAMILY,
        value: fontSelected.value
    })
    onClose()
}

function applyForAll() {
    emit("applyForAll", {
        prop: DialogProps.FONT_FAMILY,
        value: fontSelected.value
    })
    onClose()
}

function onClose() {
    emit("onClose", DialogProps.FONT_FAMILY)
}

</script>