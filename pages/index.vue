<template>
    <v-app class="default-background-color">
        <v-container>
            <v-tabs v-model="tab" >
                <v-tab :value="1">Texto</v-tab>
                <v-tab :value="2">Estilo</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :value="1">
                <v-card height="250" class="pa-5 overflow-auto">
                    <v-row v-for="(input, i) in inputs">
                        <v-text-field :placeholder="textFieldPlaceholder" autofocus v-model="input.text" :id="i.toString()" :key="i" @update:focused="updateActualImageIndex(i)" @keydown.enter="addInputOnEnter()">
                            <template v-slot:append-inner>
                                <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                            </template>
                        </v-text-field>
                    </v-row>
                    <v-row class="d-flex justify-center">
                        <v-btn @click="addInput" icon="mdi-plus" :color="Colors.OXFORD_BLUE_LIGHT"></v-btn>
                    </v-row>
                </v-card>
                </v-window-item>
                <v-window-item :value="2">
                <v-card max-height="250" class="pa-5 overflow-auto">
                    <styleOptions
                        @on-click="openStyleOptions"
                    ></styleOptions>
                </v-card>
                </v-window-item>
            </v-window>
            <v-carousel :disabled="tab == 2" show-arrows="hover" v-model="actualImageOnCarrousel">
                <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
                </v-carousel-item>
            </v-carousel>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import { Options } from "@/types/style-options"
import { Colors } from "@/enums/colors"
import styleOptions from "~/components/style-options.vue";
import { useInputsStore } from "@/stores/inputs"

const inputsStore = useInputsStore()

let tab = ref();

const textFieldPlaceholder = "Digite o seu texto aqui"

let inputs = inputsStore.getInputs;
let textToImages = computed(() => inputs.map((i) => TextToImage.new(i.text, i.options)))
let images = computed(() => textToImages.value.map((i) => i.render().toDataUrl()))
let actualImageOnCarrousel = ref(0);
let propSelected = ref("")

function addInputOnEnter() {
    addInput();
}

function addInput() {
    inputsStore.addInput()
    scrollToLastTextField()
}

function scrollToLastTextField() {
    const elementId = document.getElementById(inputsStore.getActualIndexOnEdit.toString())
    if (elementId) elementId.scrollIntoView({ behavior: "smooth"})
}

function openStyleOptions(prop: string) {
    propSelected.value = prop;
}

function updateActualImageIndex(index: number) {
    actualImageOnCarrousel.value = index;
}

function goToLastIndex(index: number) {
    actualImageOnCarrousel.value = (index - 1)
}

function removeInput(index: number) {
    inputsStore.removeInputByIndex(index)
    goToLastIndex(index)
}

watch(actualImageOnCarrousel, () => {
    inputsStore.updateActualIndex(actualImageOnCarrousel.value)
})

watch(tab, () => {
    inputsStore.updateTab(tab.value)
})

</script>

<style scoped>
.default-background-color {
    background-color: #EEF0F2;
}
</style>