<template>
   <div class="ma-0 d-flex justify-center">
        <v-btn prepend-icon="mdi-palette" variant="tonal" :color="Colors.OXFORD_BLUE" class="mt-0 mb-2" @click="toggleShowSwatches"> {{  showSwatchesText }}</v-btn>
    </div>
    <v-color-picker mode="hexa" v-model="color" :show-swatches="showSwatches"></v-color-picker>
</template>

<script setup lang="ts">
import { Colors } from "@/enums/colors"

const emit = defineEmits(["onPickColor"])

const showSwatchesText = "Mostrar Paletas"
let color = ref("")

let showSwatches = ref(false);
function toggleShowSwatches() {
    showSwatches.value = !showSwatches.value
}

watch(color, () => {
    emit("onPickColor", color.value)
})

</script>

<style scoped>

</style>