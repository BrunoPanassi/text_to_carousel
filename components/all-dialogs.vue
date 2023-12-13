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
    </div>
</template>

<script setup lang="ts">
import backgroundColor from "~/components/background-color.vue";
import fontFamily from "~/components/font-family.vue";
import { DialogProps } from "@/enums/dialog-prop"

let backgroundColorsDialog = ref(false);
let fontFamilyDialog = ref(false);

const emit = defineEmits(["onApply", "onCleanProp", "onApplyForAll"])

function updateBackgroundColorDialog(value: boolean) {
    backgroundColorsDialog.value = value
}

function updateFontFamily(value: boolean) {
    fontFamilyDialog.value = value
}

const props = defineProps({
    propSelected: {type: String, required: true}
})

const { propSelected } = toRefs(props);

function onOpenProp(prop: string) {
    if (prop == DialogProps.BACKGROUND_COLOR) updateBackgroundColorDialog(true);
    if (prop == DialogProps.FONT_FAMILY) updateFontFamily(true);
}

function onCloseProp(prop: string) {
    if (prop == DialogProps.BACKGROUND_COLOR) updateBackgroundColorDialog(false);
    if (prop == DialogProps.FONT_FAMILY) updateFontFamily(false);
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