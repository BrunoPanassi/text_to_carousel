<template>
    <v-file-input accept="image/*" @change="previewImage" id="my-file" chips show-size/>
    <v-btn class="mt-3 ml-5" :color="Colors.OXFORD_BLUE" @click="remove">{{ removeText }}</v-btn>
    <simpleDialog :dialog-clicked="confirmDialog" @on-confirm="onConfirm" />
    <dialogMessage :dialog-clicked="messageDialogClick" :message="messageDialog" @on-close="onCloseMessageDialog"/> 
</template>

<script setup lang="ts">
import { useInputsStore } from "#imports";
import { DialogProps } from '~/enums/dialog-prop';
import { getCanvasImage } from "ultimate-text-to-image";
import { Colors } from "@/enums/colors"

const props = defineProps({
    action: {Type: String, required: false, default: ""}
})

const { action } = toRefs(props)

const emit = defineEmits(["onClose", "onCleanAction"])

let lastBackgroundImage = ref();
let messageDialogClick = ref(false);
let messageDialog = ref("")

let removeText = "Remover"

let wasAppliedOrRemoved = ref(false)
let preview = ref();
let image = ref();

const inputsStore = useInputsStore()
const { tab } = storeToRefs(inputsStore) 

let confirmDialog = ref(false)

function onCloseMessageDialog() {
    messageDialogClick.value = false
}

function sizeLowerThanAllowed(fileSize: number) {
    const sizeAllowedInMB = 2
    const ONE_BYTE_TO_ONE_MB = 0.00000095367432
    const fileSizeInMb = (fileSize * ONE_BYTE_TO_ONE_MB)
    return fileSizeInMb <= sizeAllowedInMB
}

async function previewImage(event: any) {
    let input = event.target;
      if (input.files) {
        if (sizeLowerThanAllowed(input.files[0].size)) {
            let reader = new FileReader();
            reader.onload = async (e) => {
            preview.value = await e?.target?.result;
            }
            image.value=input.files[0];
            reader.readAsDataURL(input.files[0]);
        } else {
            messageDialog.value = "imagem maior que 2MB, favor usar uma imagem com tamanho menor!"
            messageDialogClick.value = true
        }
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
    wasAppliedOrRemoved.value = true
    emit("onClose")
}

function onApplyForAll() {
    wasAppliedOrRemoved.value = true
    inputsStore.updateStyleOptionForAll(DialogProps.IMAGES);
    closeConfirmDialog()
    emit("onClose")
}

function remove() {
    wasAppliedOrRemoved.value = true
    inputsStore.updateStyleOption([], DialogProps.IMAGES);
}

function onClose() {
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
    if (!wasAppliedOrRemoved.value) onClose()
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