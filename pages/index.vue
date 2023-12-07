<template>
    <v-app>
        <v-container>
            <v-row v-for="(input, i) in inputs">
                <v-text-field v-model="input.text" :key="i">
                    <template v-slot:prepend>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="openStyleOptions">
                                    <v-list-item-title>Opções de Estilo</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                    <template v-slot:append-inner>
                        <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                    </template>
                </v-text-field>
            </v-row>
            <v-btn @click="addInput">Adicionar</v-btn>
            <v-carousel>
                <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <styleOptions :dialogClicked="styleOptionsDialog" @on-close="onCloseStypeOptions"></styleOptions>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import styleOptions from "~/components/style-options.vue";
import { ref } from "vue";

interface Text {
    text: string
}

let inputs: Ref<Array<Text>> = ref([{text: ""}]);
function addInput() {
    inputs.value.push({text: ""})
}

let styleOptionsDialog = ref(false);

const doesHaveMoreThanOneInput = computed(() => inputs.value.length > 1)

function openStyleOptions() {
    styleOptionsDialog.value = true;
}

function onCloseStypeOptions() {
    styleOptionsDialog.value = false;
}

function removeInput(index: number) {
    if (doesHaveMoreThanOneInput) inputs.value.splice(index, 1)
}

let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text)))


</script>

<style lang="scss" scoped>

</style>