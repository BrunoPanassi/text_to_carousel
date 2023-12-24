<template>
    <v-row id="horizontal-align" class="d-flex align-end mr-5 mt-6 flex-column">
        <v-btn-toggle v-model="horizontalAlign" class="my-5" :color="Colors.OXFORD_BLUE_LIGHT">
            <v-btn 
                v-for="(align, i) in alignValues" 
                @click="onSetValue(align.value)"
                rounded="5"
                :value="align.value"
                :key="i" 
                :icon="align.icon"
            > 
            </v-btn>
        </v-btn-toggle>
    </v-row>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { Colors } from "@/enums/colors"
import { useInputsStore } from "#imports";
import simpleDialog from "@/components/simple-dialog.vue"
import { DialogProps } from '~/enums/dialog-prop';

const alignValues = [
    {
        icon: "mdi-format-align-left",
        text: "Esquerda",
        value: "left"
    },
    {
        icon: "mdi-format-align-center",
        text: "Centro",
        value: "center"
    },
    {
        icon: "mdi-format-align-right",
        text: "Direita",
        value: "right"
    }
]

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let horizontalAlign = ref("")
let lastHorizontalAlignColor = ref("");

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

function onSetValue(value: string) {
    horizontalAlign.value = value;
}

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
    inputsStore.updateStyleOptionForAll(DialogProps.ALIGN);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastHorizontalAlignColor.value, DialogProps.ALIGN);
    emit("onClose")
}

function scrollToTheTop() {
    const elementId = document.getElementById("horizontal-align")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

onMounted(() => {
    lastHorizontalAlignColor.value = inputsStore.getActualPropValueOnEdit(DialogProps.ALIGN).toString()
    horizontalAlign.value = inputsStore.getActualPropValueOnEdit(DialogProps.ALIGN).toString()
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

watch(horizontalAlign, () => {
    inputsStore.updateStyleOption(horizontalAlign.value, DialogProps.ALIGN)
})

</script>

<style scoped>

</style>