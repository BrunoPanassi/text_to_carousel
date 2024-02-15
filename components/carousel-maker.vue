<template>
    <div>
        <v-tabs v-model="tab" >
            <v-tab :value="1">Texto</v-tab>
            <v-tab :value="2">Estilo</v-tab>
        </v-tabs>
        <div>
            <div v-if="tab == 1">
            <v-card height="250" class="pa-5 overflow-auto">
                <v-row v-for="(input, i) in inputs">
                    <v-text-field :placeholder="textFieldPlaceholder" autofocus v-model="input.text" :id="i.toString()" :key="i" @update:model-value="updateActualImageIndex(i)" @mousedown:control="updateActualImageIndex(i)" @keydown.enter="addInputOnEnter()">
                        <template v-slot:append-inner>
                            <v-btn variant="text" icon="mdi-close" @click="removeInput(i)" />
                        </template>
                    </v-text-field>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn @click="addInput" icon="mdi-plus" :color="Colors.OXFORD_BLUE_LIGHT"></v-btn>
                </v-row>
            </v-card>
            </div>
            <div v-if="tab == 2">
            <v-card max-height="250" class="pa-5 overflow-auto">
                <styleOptions
                    @on-click="openStyleOptions"
                ></styleOptions>
            </v-card>
            </div>
        </div>
        <v-carousel :disabled="tab == 2" v-model="actualImageOnCarrousel" :touch="onTouch">
            <template v-slot:prev="{ props }">
                <v-btn
                    icon="mdi-arrow-left-thin"
                    @click="onClickOnCarouselButton(props)"
                ></v-btn>
            </template>
            <template v-slot:next="{ props }">
                <v-btn
                    icon="mdi-arrow-right-thin"
                    @click="onClickOnCarouselButton(props)"
                ></v-btn>
            </template>
            <v-carousel-item v-for="(image, key) in images" :key="key" :src="image">
            </v-carousel-item>
        </v-carousel>
        <v-row class="d-flex justify-center my-10">
            <v-btn size="large" :color="Colors.OXFORD_BLUE_LIGHT" @click="download" :loading="downloadLoading">
                Baixar
                <v-icon end icon="mdi-download"></v-icon>
            </v-btn>
        </v-row>
        <dialogMessage :dialog-clicked="messageDialogClick" :message="messageDialog" @on-close="onCloseMessageDialog"/> 
    </div>
</template>

<script setup lang="ts">
import TextToImage from "@/service/textToImage";
import { Colors } from "@/enums/colors"
import { useInputsStore } from "@/stores/inputs"
import JSZip from "jszip"
import fileSaver from "file-saver"

const inputsStore = useInputsStore()

let tab = ref();

const textFieldPlaceholder = "Digite o seu texto aqui"

let messageDialogClick = ref(false);
let messageDialog = ref("");

let isSelecting = ref(false);

function onCloseMessageDialog() {
    messageDialogClick.value = false
}

let inputs = inputsStore.getInputs;
let textToImages = computed(() => inputs.map((i) => TextToImage.new(i.text, i.options)))
let images = computed(() => {
    return isSelecting.value ? [] : textToImages.value.map((i) => i.render().toDataUrl())
})

let imagesToDownload = computed(() => {
    return images.value.map((image, i) => {
        return {
            title: `image_${i}.png`,
            image: image.replace(/^data:image\/(png|jpg);base64,/, "")
        }
    })
})
let actualImageOnCarrousel = ref(0);
let propSelected = ref("")
let onTouch = { 
        left: () => tryToViewCarouselOnImageEdit(),
        right: () => tryToViewCarouselOnImageEdit()
    }

let downloadLoading = ref(false);

function onClickOnCarouselButton(props: any) {
    if (tab.value == 2) {
        tryToViewCarouselOnImageEdit()
    } else {
        props.onClick()
    }
}

function tryToViewCarouselOnImageEdit() {
    showMessageDialog("Finalize a edição da imagem!")
}

function showMessageDialog(text: string) {
    messageDialog.value = text
    messageDialogClick.value = true;
}

function imagesToZip() {
    let zip = new JSZip()
    zip.folder("images")
    let imagesFolder = zip.folder("images")
    imagesToDownload.value.forEach((image) => {
        imagesFolder?.file(image.title, image.image, {base64: true, binary: true})
    })
    return zip
}

function createFileName() {
    let date = new Date();
    const time = date.toLocaleTimeString().split(":").join("_")
    const dateFormatted = date.toLocaleDateString().replaceAll("/", "_")
    return `carofy_${dateFormatted}_${time}.zip`
}

async function tryToDownload(fileName: string, zip: JSZip) {
    try {
        downloadLoading.value = true;
        await zip.generateAsync({type:"blob"}).then(function(content) {
            fileSaver.saveAs(content, fileName);
        });
    } catch (error) {
        showMessageDialog("Erro ao fazer download da imagem");
    } finally {
        downloadLoading.value = false;
        showMessageDialog(`Download feito! Arquivo gerado: ${fileName}`);
    }
}

async function download() {
    let zip = imagesToZip()
    const fileName = createFileName()
    tryToDownload(fileName, zip)
}



function addInputOnEnter() {
    addInput();
}

function addInput() {
    inputsStore.addInput()
    scrollToLastTextField()
}

function scrollToLastTextField() {
    const elementId = document.getElementById(inputsStore.getActualIndexOnEdit.toString())
    if (elementId) elementId.scrollIntoView({ behavior: "smooth"})
}

function openStyleOptions(prop: string) {
    propSelected.value = prop;
}

function updateActualImageIndex(index: number) {
    actualImageOnCarrousel.value = index;
}

function goToLastIndex(index: number) {
    actualImageOnCarrousel.value = (index - 1)
}

function removeInput(index: number) {
    inputsStore.removeInputByIndex(index)
    goToLastIndex(index)
}

function setTimeOut(delay: number) {
    setTimeout(() => {
        updateIsSelecting(false)
    }, delay)
}

function updateIsSelecting(value: boolean) {
    isSelecting.value = value
}

watch(actualImageOnCarrousel, () => {
    inputsStore.updateActualIndex(actualImageOnCarrousel.value)
})

watch(tab, () => {
    inputsStore.updateTab(tab.value)
})

watch(inputs, () => {
    const DELAY_IN_SECONDS = 500
    if (!isSelecting.value) {
        updateIsSelecting(true)
        setTimeOut(DELAY_IN_SECONDS)
    }
})

</script>

<style scoped>
</style>