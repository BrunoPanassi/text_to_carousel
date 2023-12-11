<template>
    <v-app>
        <v-container>
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
            <v-row class="mt-10 mb-4 d-flex justify-center">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn color="#892B64" variant="outlined" v-bind="props">{{ imageStyleTitle }}</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(style, i) in styleOptionsItens" @click="openStyleOptions(style.prop)">
                            <v-list-item-title>{{ style.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
            <v-carousel show-arrows="hover" v-model="actualImageOnCarrousel">
                <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <allDialogs
            :prop-selected="propSelected"
            @on-apply="onApply"
        >
        </allDialogs>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import { Options } from "@/types/style-options"
import { DialogProps } from "@/enums/dialog-prop"
import allDialogs from "~/components/all-dialogs.vue";

type Text = {
    text: string,
    options: Options
}

const imageStyleTitle = "Estilo da Imagem"

const styleOptionsItens = [
    {
        text: "Cor de Fundo",
        prop: DialogProps.BACKGROUND_COLOR,
    },
    {
        text: "Fonte",
        prop: DialogProps.FONT_FAMILY,
    },
    {
        text: "Tamanho da Fonte",
        prop: DialogProps.FONT_SIZE,
    },
    {
        text: "Cor da Fonte",
        prop: DialogProps.FONT_COLOR,
    },
    {
        text: "Alinhamento Horizontal",
        prop: DialogProps.ALIGN,
    },
    {
        text: "Alinhamento Vertical",
        prop: DialogProps.VALIGN,
    }
]

let inputs: Ref<Array<Text>> = ref([{text: "", options: TextToImage.getDefaultOptions()}]);
let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text, i.options)))
let actualImageOnCarrousel = ref(0);
let propSelected = ref("")

function addInputOnEnter() {
    addInput();
}

function addInput() {
    inputs.value.push({text: "", options: TextToImage.getDefaultOptions()})
}

function openStyleOptions(prop: string) {
    propSelected.value = prop;
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
}

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput) inputs.value.splice(index, 1)
}

</script>