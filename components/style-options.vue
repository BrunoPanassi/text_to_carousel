<template>
    <menuListItem
        :title="imageStyleTitle"
        :itens="styleOptionsItens"
        @on-click="onClick"
    />
</template>

<script setup lang="ts">
import menuListItem from "~/components/menu-list-item.vue";
import { DialogProps } from "@/enums/dialog-prop"

const emit = defineEmits(["onClick"])

const imageStyleTitle = "Estilo da Imagem"

const styleOptionsItens = [
    {
        text: "Cor de Fundo",
        prop: DialogProps.BACKGROUND_COLOR,
    },
    {
        text: "Fonte",
        prop: DialogProps.FONT_FAMILY,
    },
    {
        text: "Tamanho da Fonte",
        prop: DialogProps.FONT_SIZE,
    },
    {
        text: "Cor da Fonte",
        prop: DialogProps.FONT_COLOR,
    },
    {
        text: "Alinhamento Horizontal",
        prop: DialogProps.ALIGN,
    },
    {
        text: "Alinhamento Vertical",
        prop: DialogProps.VALIGN,
    }
]

function onClick(prop: string) {
    emit("onClick", prop)
}

</script>