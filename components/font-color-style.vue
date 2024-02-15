<template>
    <v-color-picker id="font-color" min-width="150" mode="hexa" v-model="color"></v-color-picker>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
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
let lastFontColor = ref("");

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
    inputsStore.updateStyleOptionForAll(DialogProps.FONT_COLOR);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastFontColor.value, DialogProps.FONT_COLOR);
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

onMounted(() => {
    lastFontColor.value = inputsStore.getActualPropValueOnEdit(DialogProps.FONT_COLOR).toString()
    color.value = inputsStore.getActualPropValueOnEdit(DialogProps.FONT_COLOR).toString()
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
    inputsStore.updateStyleOption(color.value, DialogProps.FONT_COLOR)
})

</script>