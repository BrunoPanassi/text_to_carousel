<template>
    <v-dialog v-model="dialog" max-width="300px" max-height="500px">
        <v-card>
            <template v-slot:prepend>
                <p>{{ title }}</p>
            </template>
            <template v-slot:append>
                <v-btn @click="onClose" icon="mdi-close" variant="text"></v-btn>
            </template>
            <v-card-item>
                <v-color-picker mode="hexa" v-model="color"></v-color-picker>
            </v-card-item>
            <v-card-actions>
                <v-btn color="green-darken-3" block variant="flat" @click="applyColor" :disabled="!isColorSelected">Aplicar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

let dialog = ref(false);

let color = ref("")

const title = "Cor de Fundo"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const isColorSelected = computed(() => !!color.value)

const { dialogClicked } = toRefs(props)
const emit = defineEmits(["onClose", "applyColor"])
function onClose() {
    emit("onClose")
}

function applyColor() {
    emit("applyColor", color.value)
    emit("onClose")
}

watch(dialogClicked, (currDialog) => {
    dialog.value = currDialog
})

watch(dialog, () => {
    if(!dialog.value) emit("onClose")
})

</script>