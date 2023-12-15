<template>
    <dialogComponent 
        :dialogClicked="dialogClicked" 
        @on-close="onClose" 
        :use-actions="false"
        :disable-function="isAlignSelected"
        @on-apply="onApply"
        @apply-for-all="applyForAll">
        <template v-slot:title>
            <p>{{ title }}</p>
        </template>
        <template v-slot:item>
            <v-row class="d-flex align-center flex-column">
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
        </template>
    </dialogComponent>
</template>

<script setup lang="ts">
import dialogComponent from './dialog-component.vue';
import { DialogProps } from "@/enums/dialog-prop"
import { Colors } from "@/enums/colors"

let horizontalAlign = ref("")
const title = "Alinhamento Horizontal"

let isAlignSelected = computed(() => !!horizontalAlign.value)

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const { dialogClicked } = toRefs(props)

const emit = defineEmits(["onClose", "onApply", "applyForAll"])

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

function onSetValue(value: string) {
    horizontalAlign.value = value;
}

function onApply() {
    emit("onApply", {
        prop: DialogProps.ALIGN,
        value: horizontalAlign.value
    })
    onClose()
}

function applyForAll() {
    emit("applyForAll", {
        prop: DialogProps.ALIGN,
        value: horizontalAlign.value
    })
    onClose()
}

function onClose() {
    emit("onClose", DialogProps.ALIGN)
}

</script>

<style scoped>
    .selected {
        background-color: blue;
    }
</style>