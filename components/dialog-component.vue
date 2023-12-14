<template>
    <v-dialog v-model="dialog" max-width="300px" max-height="600px" absolute class="align-flex-center-top">
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
            <v-card-actions v-if="useActions">
                <slot name="actions"></slot>
            </v-card-actions>
            <div v-else>
                <div class="d-flex flex-column">
                    <v-btn color="#1780A1" class="ma-2" variant="outlined" @click="applyForAll" :disabled="!disableFunction">{{ applyForAllText }}</v-btn>
                    <v-btn color="#1780A1" class="ma-2" variant="flat" @click="onApply" :disabled="!disableFunction">{{ apply }}</v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

let dialog = ref(false);

const apply = "Aplicar"
const applyForAllText = "Aplicar para todos"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true},
    useActions: { type: Boolean, required: false, default: true},
    disableFunction: { type: Boolean, required: false, default: false}
})
const { dialogClicked, useActions, disableFunction } = toRefs(props)

const emit = defineEmits(["onClose", "onApply", "applyForAll"])

function onApply() {
    emit("onApply")
}

function applyForAll() {
    emit("applyForAll")
}

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

<style scoped>
    .align-flex-center-top {
        align-items: flex-start; 
        justify-content: center;
    }
</style>