<template>
    <v-row id="horizontal-align" class="d-flex flex-column align-end mr-5 mt-6">
        <v-btn-toggle v-model="verticalAlign" class="my-5" :color="Colors.OXFORD_BLUE_LIGHT">
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
        icon: "mdi-align-vertical-top",
        text: "Topo",
        value: "top"
    },
    {
        icon: "mdi-align-vertical-center",
        text: "Centro",
        value: "middle"
    },
    {
        icon: "mdi-align-vertical-bottom",
        text: "Direita",
        value: "bottom"
    }
]

let verticalAlign = ref("")
let lastverticalAlign = ref("");

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

function onSetValue(value: string) {
    verticalAlign.value = value;
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
    inputsStore.updateStyleOption(lastverticalAlign.value, DialogProps.VALIGN);
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
    lastverticalAlign.value = inputsStore.getActualPropValueOnEdit(DialogProps.VALIGN).toString()
    verticalAlign.value = inputsStore.getActualPropValueOnEdit(DialogProps.VALIGN).toString()
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

watch(verticalAlign, () => {
    inputsStore.updateStyleOption(verticalAlign.value, DialogProps.VALIGN)
})

</script>