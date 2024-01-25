<template>
     <v-row id="margin-style" class="d-flex flex-column" style="max-width: 600px;">
        <div v-for="(margin, i) in marginValues" :key="i">
            <p class="text-center pa-2">{{ margin.title }}</p>
            <v-slider v-model="margin.value" :min="minSize" :max="maxSize" hide-details>
                <template v-slot:prepend>
                    <v-btn size="x-small" elevation="5" @click="plusOrMinus(margin.title, false)" icon="mdi-minus"></v-btn>
                </template>
                <template v-slot:append>
                    <v-btn size="x-small" elevation="5" @click="plusOrMinus(margin.title, true)" icon="mdi-plus"></v-btn>
                </template>
            </v-slider>
            <div class="d-flex justify-center my-2 mx-5">
                {{ margin.value.toFixed() }}
            </div>
        </div>
    </v-row>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import simpleDialog from "@/components/simple-dialog.vue"
import { DialogProps } from '~/enums/dialog-prop';

let minSize = 40
let maxSize = 1000;

let marginTop = ref(minSize);
let marginLeft = ref(minSize);
let marginRight = ref(minSize);
let marginBottom = ref(minSize);

let lastMarginTop = ref(marginTop.value);
let lastMarginLeft = ref(marginLeft.value);
let lastMarginRight = ref(marginRight.value);
let lastMarginBottom = ref(marginBottom.value);

const marginValues = ref([
    {
        title: "Margem no Topo",
        value: marginTop
    },
    {
        title: "Margem à Esquerda",
        value: marginLeft
    },
    {
        title: "Margem à Direita",
        value: marginRight
    },
    {
        title: "Margem em Baixo",
        value: marginBottom
    }
])

function plusOrMinus(title: string, plus: boolean) {
    marginValues.value.forEach((m) => {
        if (m.title == title) {
            if (plus && m.value < maxSize) m.value += 1
            else if (!plus && m.value > minSize) m.value -= 1
        }
    })
}

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

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
    inputsStore.updateStyleOptionForAll(DialogProps.MARGIN_TOP);
    inputsStore.updateStyleOptionForAll(DialogProps.MARGIN_LEFT);
    inputsStore.updateStyleOptionForAll(DialogProps.MARGIN_RIGHT);
    inputsStore.updateStyleOptionForAll(DialogProps.MARGIN_BOTTOM);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    inputsStore.updateStyleOption(lastMarginBottom.value, DialogProps.MARGIN_TOP);
    inputsStore.updateStyleOption(lastMarginBottom.value, DialogProps.MARGIN_LEFT);
    inputsStore.updateStyleOption(lastMarginBottom.value, DialogProps.MARGIN_RIGHT);
    inputsStore.updateStyleOption(lastMarginBottom.value, DialogProps.MARGIN_BOTTOM);
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

onMounted(() => {
    lastMarginTop.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_TOP))
    marginTop.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_TOP))
    
    lastMarginLeft.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_LEFT))
    marginLeft.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_LEFT))

    lastMarginRight.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_RIGHT))
    marginRight.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_RIGHT))

    lastMarginBottom.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_BOTTOM))
    marginBottom.value = Number(inputsStore.getActualPropValueOnEdit(DialogProps.MARGIN_BOTTOM))
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

let isSelecting = ref(false)
const delayInSeconds = 500

function updateIsSelecting(value: boolean) {
    isSelecting.value = value
}

function updateWithDelay(updateFunction: Function) {
    if (!isSelecting.value) {
        updateIsSelecting(true)
        setTimeOut(updateFunction)
    }
}

function setTimeOut(updateFunction: Function) {
    setTimeout(() => {
        updateIsSelecting(false)
        updateFunction()
    }, delayInSeconds)
}

function updateMarginTop() {
    inputsStore.updateStyleOption(marginTop.value, DialogProps.MARGIN_TOP)
}

function updateMarginLeft() {
    inputsStore.updateStyleOption(marginLeft.value, DialogProps.MARGIN_LEFT)
}

function updateMarginRight() {
    inputsStore.updateStyleOption(marginRight.value, DialogProps.MARGIN_RIGHT)
}

function updateMarginBottom() {
    inputsStore.updateStyleOption(marginBottom.value, DialogProps.MARGIN_BOTTOM)
}

watch(marginTop, () => {
    updateWithDelay(updateMarginTop)
})

watch(marginLeft, () => {
    updateWithDelay(updateMarginLeft)
})

watch(marginRight, () => {
    updateWithDelay(updateMarginRight)
})

watch(marginBottom, () => {
    updateWithDelay(updateMarginBottom)
})

</script>