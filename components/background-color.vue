<template>
    <dialogComponent :dialogClicked="dialogClicked" @on-close="onClose">
        <template v-slot:title>
            <p>{{ title }}</p>
        </template>
        <template v-slot:item>
            <v-color-picker mode="hexa" v-model="color"></v-color-picker>
        </template>
        <template v-slot:actions>
            <v-btn color="#469D89" block variant="flat" @click="applyColor" :disabled="!isColorSelected">Aplicar</v-btn>
        </template>
    </dialogComponent>
</template>

<script setup lang="ts">
import dialogComponent from './dialog-component.vue';
import { DialogProps } from "@/enums/dialog-prop"

let color = ref("")

const title = "Cor de Fundo"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const isColorSelected = computed(() => !!color.value)

const { dialogClicked } = toRefs(props)
const emit = defineEmits(["onClose", "applyColor"])

function applyColor() {
    emit("applyColor", {
        prop: DialogProps.BACKGROUND_COLOR,
        value: color.value
    })
    onClose()
}

function onClose() {
    emit("onClose", DialogProps.BACKGROUND_COLOR)
}

</script>