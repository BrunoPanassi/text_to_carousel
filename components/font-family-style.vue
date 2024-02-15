<template>
    <v-select id="font-family" style="max-width: 300px;" class="mr-2" :items="fonts" v-model="fontSelected"></v-select>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import { DialogProps } from '~/enums/dialog-prop';

let fonts = [
    "Arial",
    "Helvetica",
    "Verdana, Tahoma",
    "Times New Roman",
    "Courier New",
    "Noto Sans TC"
]

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let fontSelected = ref("Arial")
let lastFontFamily = ref("");

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
    inputsStore.updateStyleOptionForAll(DialogProps.FONT_FAMILY);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastFontFamily.value, DialogProps.FONT_FAMILY);
    emit("onClose")
}

function scrollToTheTop() {
    const elementId = document.getElementById("font-family")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

onMounted(() => {
    lastFontFamily.value = inputsStore.getActualPropValueOnEdit(DialogProps.FONT_FAMILY).toString()
    fontSelected.value = inputsStore.getActualPropValueOnEdit(DialogProps.FONT_FAMILY).toString()
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

watch(fontSelected, () => {
    inputsStore.updateStyleOption(fontSelected.value, DialogProps.FONT_FAMILY)
})

</script>