<template>
    <v-color-picker min-width="150" mode="hexa" v-model="color"></v-color-picker>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
    <dialogMessage :dialog-clicked="messageDialogClick" :message="messageDialog" @on-close="onCloseMessageDialog"/> 
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import { DialogProps } from '~/enums/dialog-prop';

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let color = ref("")
let lastBackgroundColor = ref("");
let backgroundImage = ref();

let isSelecting = ref(false)

let messageDialogClick = ref(false);
let messageDialog = ref("")

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
    inputsStore.updateStyleOptionForAll(DialogProps.BACKGROUND_COLOR);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastBackgroundColor.value, DialogProps.BACKGROUND_COLOR);
    emit("onClose")
}


function scrollToTheTop() {
    const elementId = document.getElementById("font-color")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function updateStyleOption() {
    inputsStore.updateStyleOption(color.value, DialogProps.BACKGROUND_COLOR)
}

function updateIsSelecting(value: boolean) {
    isSelecting.value = value
}

function setTimeOut(delay: number) {
    setTimeout(() => {
        updateIsSelecting(false)
        updateStyleOption()
    }, delay)
}

function checkIfExistsBackgroundImage() {
    backgroundImage.value = inputsStore.getActualPropValueOnEdit(DialogProps.IMAGES)
    if (backgroundImage.value?.length) {
        messageDialog.value = "Possui imagem de fundo, para alterar, favor removê-la"
        messageDialogClick.value = true
    }
}

function onCloseMessageDialog() {
    messageDialogClick.value = false
}

onMounted(() => {
    checkIfExistsBackgroundImage()
    lastBackgroundColor.value = inputsStore.getActualPropValueOnEdit(DialogProps.BACKGROUND_COLOR).toString()
    color.value = inputsStore.getActualPropValueOnEdit(DialogProps.BACKGROUND_COLOR).toString()
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

watch(color, () => {
    const DELAY_IN_SECONDS = 500
    if (!isSelecting.value) {
        updateIsSelecting(true)
        setTimeOut(DELAY_IN_SECONDS)
    }
})

</script>