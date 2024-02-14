<template>
    <v-file-input accept="image/*" @change="previewImage" id="my-file" chips show-size/>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import simpleDialog from "@/components/simple-dialog.vue"
import { DialogProps } from '~/enums/dialog-prop';
import { getCanvasImage } from "ultimate-text-to-image";

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let lastBackgroundImage = ref();

let wasApplied = ref(false)
let preview = ref();
let image = ref();

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

async function previewImage(event: any) {
    let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = async (e) => {
          preview.value = await e?.target?.result;
        }
        image.value=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
}

watch(preview, async () => {
    if (preview) {
        const canvasImage1 = await getCanvasImage({base64: preview.value});
        let images = []
        let objImage = {canvasImage: canvasImage1, layer: 0, repeat: "fit"}
        images.push(objImage)
        inputsStore.updateStyleOption(images, DialogProps.IMAGES);
    }
})

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
    wasApplied.value = true
    emit("onClose")
}

function onApplyForAll() {
    wasApplied.value = true
    inputsStore.updateStyleOptionForAll(DialogProps.IMAGES);
    closeConfirmDialog()
    emit("onClose")
}

function onClose() {
    console.log("on-close")
    inputsStore.updateStyleOption(lastBackgroundImage.value, DialogProps.IMAGES);
    emit("onClose")
}


function scrollToTheTop() {
    const elementId = document.getElementById("my-file")
    if (elementId) elementId.scrollIntoView({behavior: "smooth"})
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

onMounted(() => {
    lastBackgroundImage.value = inputsStore.getActualPropValueOnEdit(DialogProps.IMAGES) ?? []
    scrollToTheTop()
})

onBeforeUnmount(() => {
    if (!wasApplied.value) onClose()
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

</script>