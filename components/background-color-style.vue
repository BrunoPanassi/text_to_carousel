<template>
    <v-color-picker width="200" mode="hexa"></v-color-picker>
</template>

<script setup lang="ts">

let color = ref("")

const emit = defineEmits(["onPick"])

watch(color, () => {
    emit("onPick", color)
})

</script>