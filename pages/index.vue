<template>
    <v-app class="default-background-color">
        <v-container>
            <v-card height="150" class="pa-5 overflow-auto">
                <v-row v-for="(input, i) in inputs">
                    <v-text-field :placeholder="textFieldPlaceholder" autofocus v-model="input.text" :id="i.toString()" :key="i" @update:focused="updateActualImageIndex(i)" @keydown.enter="addInputOnEnter()">
                        <template v-slot:append-inner>
                            <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                        </template>
                    </v-text-field>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn @click="addInput" icon="mdi-plus" :color="Colors.OXFORD_BLUE"></v-btn>
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
import { Colors } from "@/enums/colors"
import allDialogs from "~/components/all-dialogs.vue";
import styleOptions from "~/components/style-options.vue";

type Text = {
    text: string,
    options: Options
}

const textFieldPlaceholder = "Digite o seu texto aqui"

let lastBackgroundColorSelected = ref("")
let lastBackgroundColor = computed(() => lastBackgroundColorSelected.value == "" ? Colors.BLACK_NIGHT : lastBackgroundColorSelected.value)

let lastFontSelected = ref("")
let lastFont = computed(() => lastFontSelected.value == "" ? "Arial" : lastFontSelected.value)

let lastFontSizeSelected = ref(0);
let lastFontSize = computed(() => lastFontSizeSelected.value == 0 ? 72 : lastFontSizeSelected.value)

function defaultTextValues() {
    return {
        text: "", 
        options: TextToImage.getDefaultOptions(
            lastBackgroundColor.value,
            lastFont.value,
            lastFontSize.value
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

function updateLastFontSize(size: number) {
    lastFontSizeSelected.value = size;
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
    if (propAndValue.prop == DialogProps.FONT_SIZE) onApplyFontSize(Number(propAndValue.value), applyForAll)
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

function onApplyFontSize(size: number, applyForAll = false) {
    if (applyForAll) {
        applyFontSizeAll(size)
    } else {
        inputs.value[actualImageOnCarrousel.value].options.fontSize = size
        updateLastFontSize(size)
    }
}

function applyFontSizeAll(size: number) {
    inputs.value.forEach((t: Text) => t.options.fontSize = size)
}

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function goToLastIndex(index: number) {
    actualImageOnCarrousel.value = (index - 1)
}

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput.value) {
        inputs.value.splice(index, 1)
        goToLastIndex(index)
    }
}

</script>

<style scoped>
.default-background-color {
    background-color: #EEF0F2;
}
</style>