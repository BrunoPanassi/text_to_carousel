<template>
    <v-app>
        <v-container>
            <v-row v-for="(input, i) in inputs">
                <v-text-field v-model="input.text" :key="i"></v-text-field>
            </v-row>
            <v-btn @click="addInput">Adicionar</v-btn>
            <v-carousel>
                <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
                </v-carousel-item>
            </v-carousel>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import { ref } from "vue";

interface Text {
    text: string
}

let inputs: Ref<Array<Text>> = ref([{text: ""}]);
function addInput() {
    inputs.value.push({text: ""})
}

function removeInput(index: number) {
    inputs.value.splice(index, 1)
}

let images = computed(() => inputs.value.map((i) => TextToImage.render(i.text)))


</script>

<style lang="scss" scoped>

</style>