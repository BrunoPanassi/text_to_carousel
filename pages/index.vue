<template>
    <v-app>
        <v-container>
            <v-text-field label="Primeira Imagem" v-model="text">
            </v-text-field>
            <v-btn>Adicionar</v-btn>
            <div>
                <img alt="" :src="imageUrl" />
            </div>
        </v-container>
    </v-app>
</template>

<script setup>
import TextToImage from "@/service/textToImage";
import { ref } from "vue";

let text = ref("");

const imageUrl = computed(() => TextToImage.render(text.value))

</script>

<style lang="scss" scoped>

</style>