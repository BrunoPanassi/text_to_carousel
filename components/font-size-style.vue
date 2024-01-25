<template>
     <v-row id="font-size" class="d-flex flex-column align-center py-13 pr-2" style="max-width: 600px;">
        <v-slider v-model="fontSize" :min="minSize" :max="maxSize" hide-details style="width: 300px">
            <template v-slot:prepend>
                <v-btn size="small" elevation="5" @click="minus" icon="mdi-minus"></v-btn>
            </template>
            <template v-slot:append>
                <v-btn size="small" elevation="5" @click="plus" icon="mdi-plus"></v-btn>
            </template>
        </v-slider>
        <v-text-field style="width: 100px;" type="number" :value="valueOnEdit" @update:model-value="controlValue"></v-text-field>
        </v-row>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import simpleDialog from "@/components/simple-dialog.vue"
import { DialogProps } from '~/enums/dialog-prop';

const minSize = 72
const maxSize = 120
let fontSize = ref(maxSize)
let valueOnEdit = ref(minSize)
let isSelecting = ref(false)

function plus() {
    if (fontSize.value < maxSize)  fontSize.value += 1
}

function minus() {
    if (fontSize.value > minSize) fontSize.value -= 1
}

function controlValue(event: string) {
    let value = Number(event)
    valueOnEdit.value = value
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
    console.log("onApply")
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
    const elementId = document.getElementById("style-options")
    if (elementId) elementId.scrollIntoView()
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function updateStyleOption() {
    inputsStore.updateStyleOption(fontSize.value, DialogProps.FONT_SIZE)
}

function updateIsSelecting(value: boolean) {
    isSelecting.value = value
}

function setTimeOut(delay: number) {
    setTimeout(() => {
        valueOnEdit.value = Number(fontSize.value.toFixed())
        updateIsSelecting(false)
        updateStyleOption()
    }, delay)
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

watch(valueOnEdit, () => {
    fontSize.value = valueOnEdit.value
    if (valueOnEdit.value > maxSize) fontSize.value = maxSize
    if (valueOnEdit.value < minSize) fontSize.value = minSize
})

watch(tab, () => {
    onClose()
})

watch(fontSize, () => {
    const DELAY_IN_SECONDS = 500
    if (isSelecting.value == false) {
        updateIsSelecting(true)
        setTimeOut(DELAY_IN_SECONDS)
    }
})

</script>