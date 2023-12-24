<template>
     <v-row id="font-size" class="d-flex flex-column py-13 pr-2" style="max-width: 600px;">
        <v-slider v-model="fontSize" :min="minSize" :max="maxSize" hide-details>
            <template v-slot:prepend>
                <v-btn size="small" elevation="5" @click="minus" icon="mdi-minus"></v-btn>
            </template>
            <template v-slot:append>
                <v-btn size="small" elevation="5" @click="plus" icon="mdi-plus"></v-btn>
            </template>
        </v-slider>
        <div class="d-flex justify-center my-2 mx-5">
            {{ fontSize.toFixed() }}
        </div>
        </v-row>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import simpleDialog from "@/components/simple-dialog.vue"
import { DialogProps } from '~/enums/dialog-prop';

const minSize = 0
const maxSize = 120
let fontSize = ref(maxSize)

function plus() {
    if (fontSize.value < maxSize)  fontSize.value += 1
}

function minus() {
    if (fontSize.value > minSize) fontSize.value -= 1
}

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let lastFontSize = ref(fontSize.value);

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

function onConfirm(confirm: boolean) {
    if (confirm) onApplyForAll()
    else closeConfirmDialog()
}

function openConfirmDialog() {
    confirmDialog.value = true
}

function closeConfirmDialog() {
    confirmDialog.value = false
    emit("onCleanAction")
}

function onApply() {
    emit("onClose")
}

function onApplyForAll() {
    inputsStore.updateStyleOptionForAll(DialogProps.FONT_SIZE);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastFontSize.value, DialogProps.FONT_SIZE);
    emit("onClose")
}

function scrollToTheTop() {
    const elementId = document.getElementById("font-size")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

onMounted(() => {
    lastFontSize.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.FONT_SIZE))
    fontSize.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.FONT_SIZE))
    scrollToTheTop()
})

watch(action, () => {
    if (action) {
        if (action.value == "onApply") onApply()
        if (action.value == "onApplyForAll") openConfirmDialog()
        if (action.value == "onClose") onClose()
    }
})

watch(tab, () => {
    onClose()
})

watch(fontSize, () => {
    inputsStore.updateStyleOption(fontSize.value, DialogProps.FONT_SIZE)
})

</script>