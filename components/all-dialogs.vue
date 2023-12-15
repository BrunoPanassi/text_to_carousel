<template>
    <div>
        <backgroundColor 
            :dialogClicked="backgroundColorsDialog" 
            @on-close="onCloseProp"
            @apply-color="onApply"
            @apply-for-all="onApplyForAll">
        </backgroundColor>
        <fontFamily
            :dialog-clicked="fontFamilyDialog"
            @on-close="onCloseProp"
            @on-apply="onApply"
            @apply-for-all="onApplyForAll">
        </fontFamily>
        <fontSize
            :dialog-clicked="fontSizeDialog"
            @on-close="onCloseProp"
            @on-apply="onApply"
            @apply-for-all="onApplyForAll">
        </fontSize>
        <fontColor
            :dialog-clicked="fontColorDialog"
            @on-close="onCloseProp"
            @on-apply="onApply"
            @apply-for-all="onApplyForAll"> 
        >
        </fontColor>
    </div>
</template>

<script setup lang="ts">
import backgroundColor from "~/components/background-color.vue";
import fontFamily from "~/components/font-family.vue";
import fontSize from "~/components/font-size.vue"
import { DialogProps } from "@/enums/dialog-prop"
import fontColor from "./font-color.vue";

let backgroundColorsDialog = ref(false);
let fontFamilyDialog = ref(false);
let fontSizeDialog = ref(false);
let fontColorDialog = ref(false);

const emit = defineEmits(["onApply", "onCleanProp", "onApplyForAll"])

function updateBackgroundColorDialog(value: boolean) {
    backgroundColorsDialog.value = value
}

function updateFontFamilyDialog(value: boolean) {
    fontFamilyDialog.value = value
}

function updateFontDizeDialog(value: boolean) {
    fontSizeDialog.value = value
}

function updateFontColorDialog(value: boolean) {
    fontColorDialog.value = value
}

const props = defineProps({
    propSelected: {type: String, required: true}
})

const { propSelected } = toRefs(props);

function onOpenProp(prop: string) {
    if (prop == DialogProps.BACKGROUND_COLOR) updateBackgroundColorDialog(true);
    if (prop == DialogProps.FONT_FAMILY) updateFontFamilyDialog(true);
    if (prop == DialogProps.FONT_SIZE) updateFontDizeDialog(true);
    if (prop == DialogProps.FONT_COLOR) updateFontColorDialog(true);
}

function onCloseProp(prop: string) {
    if (prop == DialogProps.BACKGROUND_COLOR) updateBackgroundColorDialog(false);
    if (prop == DialogProps.FONT_FAMILY) updateFontFamilyDialog(false);
    if (prop == DialogProps.FONT_SIZE) updateFontDizeDialog(false);
    if (prop == DialogProps.FONT_COLOR) updateFontColorDialog(false);
    onCleanPropSelected()
}

function onCleanPropSelected() {
    emit("onCleanProp")
}

function onApply(propAndValue: {prop: string, value: string | number}) {
    emit("onApply", propAndValue)
}

function onApplyForAll(propAndValue: {prop: string, value: string | number}) {
    emit("onApplyForAll", propAndValue)
}

watch(propSelected, () => {
    onOpenProp(propSelected.value)
})

</script>