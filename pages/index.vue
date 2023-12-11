<template>
    <v-app>
        <v-container>
            <v-row v-for="(input, i) in inputs">
                <v-text-field v-model="input.text" :key="i" @update:focused="updateActualImageIndex(i)">
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
                        <v-list-item v-for="(style, i) in styleOptionsItens" @click="openStyleOptions(actualImageOnCarrousel, style.prop)">
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
        <backgroundColor 
            :dialogClicked="backgroundColorsDialog" 
            @on-close="onCloseStypeOptions"
            @apply-color="onApplyColor">
        </backgroundColor>
        <fontFamily
            :dialog-clicked="fontFamilyDialog"
            @on-close="onCloseFontFamily"
            @on-apply="onApplyFont">
        </fontFamily>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import backgroundColor from "~/components/background-color.vue";
import fontFamily from "~/components/font-family.vue";
import { Options } from "@/types/style-options"
import { ref } from "vue";

interface Text {
    text: string,
    backgroundColor: string,
    options: Options
}

const imageStyleTitle = "Estilo da Imagem"

let backgroundColorsDialog = ref(false);
let fontFamilyDialog = ref(false);

const styleOptionsItens = [
    {
        text: "Cor de Fundo",
        prop: "backgroundColor",
    },
    {
        text: "Fonte",
        prop: "fontFamily",
    },
    {
        text: "Tamanho da Fonte",
        prop: "fontSize",
    },
    {
        text: "Cor da Fonte",
        prop: "fontColor",
    },
    {
        text: "Alinhamento Horizontal",
        prop: "align",
    },
    {
        text: "Alinhamento Vertical",
        prop: "valign",
    }
]

let inputs: Ref<Array<Text>> = ref([{text: "", backgroundColor: "", options: TextToImage.getDefaultOptions()}]);
let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text, i.options)))
let actualImageOnCarrousel = ref(0);

function addInput() {
    inputs.value.push({text: "", backgroundColor: "", options: TextToImage.getDefaultOptions()})
    actualImageOnCarrousel.value+=1;
}

let textIndex = ref(0);

function openStyleOptions(index: number, prop: string) {
    textIndex.value = index;
    openDialogOnProp(prop)
}

function openDialogOnProp(prop: string) {
    if (prop == "backgroundColor") backgroundColorsDialog.value = true;
    if (prop == "fontFamily") fontFamilyDialog.value = true;
}

function updateActualImageIndex(index: number) {
    actualImageOnCarrousel.value = index;
}

function onCloseStypeOptions() {
    backgroundColorsDialog.value = false;
}

function onCloseFontFamily() {
    fontFamilyDialog.value = false;
}

function onApplyFont(font: string) {
    inputs.value[textIndex.value].options.fontFamily = font
}

function onApplyColor(color: string) {
    inputs.value[textIndex.value].options.backgroundColor = color;
}

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput) inputs.value.splice(index, 1)
}


</script>

<style lang="scss" scoped>

</style>