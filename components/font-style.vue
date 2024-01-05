<template>
    <v-row id="font-style" class="d-flex flex-column align-end mr-2 mt-6">
        <v-btn-toggle v-model="fontStyle" class="my-5" :color="Colors.OXFORD_BLUE_LIGHT" multiple>
            <v-btn 
                v-for="(style, i) in styleValues" 
                rounded="5"
                :value="style.value"
                :key="i"
                :class="style.class"
            >
                {{ style.text }}
            </v-btn>
        </v-btn-toggle>
    </v-row>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import simpleDialog from "@/components/simple-dialog.vue"
import { Colors } from "@/enums/colors"
import { useInputsStore } from "#imports";
import { DialogProps } from '~/enums/dialog-prop';

let fontStyle = ref([""])
let lastBoldValue = ref(false)
let lastItalicValue = ref(false)

const styleValues = [
    {
        class: "font-weight-bold pa-0 pr-1",
        text: "Negrito",
        value: "bold"
    },
    {
        class: "font-italic pa-0 pl-1",
        text: "Itálico",
        value: "italic"
    }
]

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

let isItalic = computed(() => fontStyle.value.includes("italic"))
let isBold = computed(() => fontStyle.value.includes("bold"))

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
    inputsStore.updateStyleOptionForAll(DialogProps.BOLD);
    inputsStore.updateStyleOptionForAll(DialogProps.ITALIC);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastBoldValue.value, DialogProps.BOLD);
    inputsStore.updateStyleOption(lastItalicValue.value, DialogProps.ITALIC);
    emit("onClose")
}

function scrollToTheTop() {
    const elementId = document.getElementById("font-style")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

onMounted(() => {
    lastBoldValue.value = !!inputsStore.getActualPropValueOnEdit(DialogProps.BOLD)
    fontStyle.value[0] = inputsStore.getActualPropValueOnEdit(DialogProps.BOLD) ? "bold" : ""
    lastItalicValue.value = !!inputsStore.getActualPropValueOnEdit(DialogProps.ITALIC)
    fontStyle.value[1] = inputsStore.getActualPropValueOnEdit(DialogProps.ITALIC) ? "italic" : ""
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

watch(fontStyle, () => {
    inputsStore.updateStyleOption(isBold.value, DialogProps.BOLD)
    inputsStore.updateStyleOption(isItalic.value, DialogProps.ITALIC)
})
</script>