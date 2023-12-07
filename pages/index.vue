<template>
    <v-app>
        <v-container>
            <v-text-field label="Primeira Imagem" v-model="text">
            </v-text-field>
            <div>
                <v-img width="600" :src="imageUrl"></v-img>
            </div>
        </v-container>
    </v-app>
</template>

<script setup>
import { UltimateTextToImage} from "ultimate-text-to-image";
import { ref } from "vue";

let text = ref("");

const options = {
    width: 1000,
    height: 1000,
    maxWidth: 1000,
    maxHeight: 1000,
    fontFamily: "Arial",
    fontColor: "#FFFFFF",
    fontSize: 72,
    minFontSize: 10,
    lineHeight: 50,
    margin: 20,
    marginBottom: 40,
    align: "center",
    valign: "middle",
    backgroundColor: "#000000",
    underlineSize: 2,
    autoWrapLineHeight: 80
};

const imageUrl = computed(() => new UltimateTextToImage(text.value, options).render().toDataUrl())

</script>

<style lang="scss" scoped>

</style>