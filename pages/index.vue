<template>
    <v-app>
        <v-container>
            <v-card height="150" class="pa-5 overflow-auto">
                <v-row v-for="(input, i) in inputs">
                    <v-text-field autofocus v-model="input.text" :id="i.toString()" :key="i" @update:focused="updateActualImageIndex(i)" @keydown.enter="addInputOnEnter()">
                        <template v-slot:append-inner>
                            <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                        </template>
                    </v-text-field>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn @click="addInput" icon="mdi-plus" color="#1780A1"></v-btn>
                </v-row>
            </v-card>
            <styleOptions
                @on-click="openStyleOptions"
            ></styleOptions>
            <v-carousel show-arrows="hover" v-model="actualImageOnCarrousel">
                <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <allDialogs
            :prop-selected="propSelected"
            @on-apply="onApply"
            @on-apply-for-all="onApplyForAll"
            @on-clean-prop="onCleanPropSelected"
        ></allDialogs>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import { Options } from "@/types/style-options"
import { DialogProps } from "@/enums/dialog-prop"
import allDialogs from "~/components/all-dialogs.vue";
import styleOptions from "~/components/style-options.vue";

type Text = {
    text: string,
    options: Options
}

let lastBackgroundColorSelected = ref("")
let lastBackgroundColor = computed(() => lastBackgroundColorSelected.value == "" ? "#000000" : lastBackgroundColorSelected.value)

let lastFontSelected = ref("")
let lastFont = computed(() => lastFontSelected.value == "" ? "Arial" : lastFontSelected.value)

function defaultTextValues() {
    return {
        text: "", 
        options: TextToImage.getDefaultOptions(
            lastBackgroundColor.value,
            lastFont.value
        )
    }
}

let inputs: Ref<Array<Text>> = ref([defaultTextValues()]);
let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text, i.options)))
let actualImageOnCarrousel = ref(0);
let propSelected = ref("")

function updateLastBackgroundColor(color: string) {
    lastBackgroundColorSelected.value = color;
}

function updateLastFont(font: string) {
    lastFontSelected.value = font;
}

function addInputOnEnter() {
    addInput();
}

function addInput() {
    inputs.value.push(defaultTextValues())
    scrollToLastTextField()
}

function scrollToLastTextField() {
    const elementId = document.getElementById(actualImageOnCarrousel.value.toString())
    if (elementId) elementId.scrollIntoView()
}

function openStyleOptions(prop: string) {
    propSelected.value = prop;
}

function onCleanPropSelected() {
    propSelected.value = ""
}

function updateActualImageIndex(index: number) {
    actualImageOnCarrousel.value = index;
}

function onApplyForAll(propAndValue: {prop: string, value: string | number}) {
    const APPLY_FOR_ALL = true
    onApply(propAndValue, APPLY_FOR_ALL)
}

function onApply(propAndValue: {prop: string, value: string | number}, applyForAll = false) {
    if (propAndValue.prop == DialogProps.BACKGROUND_COLOR) onApplyColor(propAndValue.value.toString(), applyForAll)
    if (propAndValue.prop == DialogProps.FONT_FAMILY) onApplyFont(propAndValue.value.toString(), applyForAll)
}

function onApplyFont(font: string, applyForAll = false) {
    if (applyForAll) {
        applyFontForAll(font)
    } else {
        inputs.value[actualImageOnCarrousel.value].options.fontFamily = font
        updateLastFont(font)
    }
}

function applyFontForAll(font: string) {
    inputs.value.forEach((t: Text) => t.options.fontFamily = font)
}

function onApplyColor(color: string, applyForAll = false) {
    if (applyForAll) {
        applyColorForAll(color)
    } else {
        inputs.value[actualImageOnCarrousel.value].options.backgroundColor = color;
        updateLastBackgroundColor(color)
    }
}

function applyColorForAll(color: string) {
    inputs.value.forEach((t: Text) => t.options.backgroundColor = color)
}

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput) inputs.value.splice(index, 1)
}

</script>