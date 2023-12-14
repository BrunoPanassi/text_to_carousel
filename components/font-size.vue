<template>
    <dialogComponent 
        :dialogClicked="dialogClicked" 
        @on-close="onClose" 
        :use-actions="false"
        :disable-function="isFontSizeSelected"
        @on-apply="onApply"
        @apply-for-all="applyForAll">
        <template v-slot:title>
            <p>{{ title }}</p>
        </template>
        <template v-slot:item>
            <v-slider v-model="fontSize" :min="minSize" :max="maxSize" hide-details>
                <template v-slot:prepend>
                    <v-btn @click="minus" icon="mdi-minus"></v-btn>
                </template>
                <template v-slot:append>
                    <v-btn @click="plus" icon="mdi-plus"></v-btn>
                </template>
            </v-slider>
            <v-row class="d-flex justify-center my-2 mx-5">
                {{ fontSize.toFixed() }}
            </v-row>
        </template>
    </dialogComponent>
</template>

<script setup lang="ts">
import dialogComponent from './dialog-component.vue';
import { DialogProps } from "@/enums/dialog-prop"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const { dialogClicked } = toRefs(props)

const title = "Tamanho da Fonte"

const minSize = 0
const maxSize = 72
let fontSize = ref(maxSize)

let isFontSizeSelected = computed(() => !!fontSize.value)

const emit = defineEmits(["onClose", "onApply", "applyForAll"])

function plus() {
    if (fontSize.value < maxSize)  fontSize.value += 1
}

function minus() {
    if (fontSize.value > minSize) fontSize.value -= 1
}

function onApply() {
    emit("onApply", {
        prop: DialogProps.FONT_SIZE,
        value: fontSize.value
    })
    onClose()
}

function applyForAll() {
    emit("applyForAll", {
        prop: DialogProps.FONT_SIZE,
        value: fontSize.value
    })
    onClose()
}

function onClose() {
    emit("onClose", DialogProps.FONT_SIZE)
}

</script>