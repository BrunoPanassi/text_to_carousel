<template>
    <v-dialog v-model="dialog" max-width="500px" max-height="500px">
        <v-card>
            <v-card-title>
                <v-btn @click="onClose" icon="mdi-close" variant="text"></v-btn>
            </v-card-title>
            <v-card-item>
                <v-color-picker></v-color-picker>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

let dialog = ref(false);

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const { dialogClicked } = toRefs(props)
const emit = defineEmits(["onClose"])
function onClose() {
    emit("onClose")
}

watch(dialogClicked, (currDialog) => {
    dialog.value = currDialog
})

</script>

<style scoped>

</style>