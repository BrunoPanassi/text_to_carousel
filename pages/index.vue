<template>
    <v-app>
        <v-container>
            <v-card height="150" class="pa-5 overflow-auto">
                <v-row v-for="(input, i) in inputs">
                    <v-text-field autofocus v-model="input.text" :key="i" @update:focused="updateActualImageIndex(i)" @keydown.enter="addInputOnEnter">
                        <template v-slot:append-inner>
                            <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                        </template>
                    </v-text-field>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn @click="addInput" icon="mdi-plus" color="#469D89"></v-btn>
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
let lastFontSelected = ref("")

let lastBackgroundColor = computed(() => lastBackgroundColorSelected.value == "" ? "#000000" : lastBackgroundColorSelected.value)

let inputs: Ref<Array<Text>> = ref([{text: "", options: TextToImage.getDefaultOptions(lastBackgroundColor.value)}]);
let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text, i.options)))
let actualImageOnCarrousel = ref(0);
let propSelected = ref("")



function addInputOnEnter() {
    addInput();
}

function addInput() {
    inputs.value.push({text: "", options: TextToImage.getDefaultOptions(
        lastBackgroundColor.value
    )})
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

function onApply(propAndValue: {prop: string, value: string | number}) {
    if (propAndValue.prop == DialogProps.BACKGROUND_COLOR) onApplyColor(propAndValue.value.toString())
    if (propAndValue.prop == DialogProps.FONT_FAMILY) onApplyFont(propAndValue.value.toString())
}

function onApplyFont(font: string) {
    inputs.value[actualImageOnCarrousel.value].options.fontFamily = font
}

function onApplyColor(color: string) {
    inputs.value[actualImageOnCarrousel.value].options.backgroundColor = color;
    lastBackgroundColorSelected.value = color;
}

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput) inputs.value.splice(index, 1)
}

</script>