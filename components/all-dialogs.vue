<template>
    <div>
        <backgroundColor 
            :dialogClicked="backgroundColorsDialog" 
            @on-close="onCloseProp"
            @apply-color="onApply">
        </backgroundColor>
        <fontFamily
            :dialog-clicked="fontFamilyDialog"
            @on-close="onCloseProp"
            @on-apply="onApply">
        </fontFamily>
    </div>
</template>

<script setup lang="ts">
import backgroundColor from "~/components/background-color.vue";
import fontFamily from "~/components/font-family.vue";
import { DialogProps } from "@/enums/dialog-prop"

let backgroundColorsDialog = ref(false);
let fontFamilyDialog = ref(false);

const emit = defineEmits(["onApply"])

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
}

function onApply(propAndValue: {prop: string, value: string | number}) {
    console.log(propAndValue)
    emit("onApply", propAndValue)
}

watch(propSelected, () => {
    onOpenProp(propSelected.value)
})

</script>