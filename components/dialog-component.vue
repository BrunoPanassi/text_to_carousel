<template>
    <v-dialog v-model="dialog" max-width="300px" max-height="500px">
        <v-card>
            <template v-slot:prepend>
               <slot name="title"></slot>
            </template>
            <template v-slot:append>
                <v-btn @click="onClose" icon="mdi-close" variant="text"></v-btn>
            </template>
            <v-card-item>
                <slot name="item"></slot>
            </v-card-item>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { watch } from "vue";

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

watch(dialog, () => {
    if(!dialog.value) emit("onClose")
})

</script>