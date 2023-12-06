<template>
    <div>
        <p>Text to Carousel</p>
        <input type="text" v-model="text">
        <div>
            <img :src="imageUrl">
        </div>
    </div>
</template>

<script setup>
import { UltimateTextToImage} from "ultimate-text-to-image";
import { ref, watch } from "vue";

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
    borderColor: 0xFF000099,
    borderSize: 2,
    backgroundColor: "#000000",
    underlineSize: 2,
};

let textToImage = ref("");

const imageUrl = computed(() => textToImage.value)

watch(text, () => {
    textToImage.value = new UltimateTextToImage(text.value, options).render().toDataUrl();
})

</script>

<style lang="scss" scoped>

</style>