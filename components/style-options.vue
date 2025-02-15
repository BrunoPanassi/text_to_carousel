<template>
    <v-card>
        <v-card-text v-if="!expand">
            <div v-for="(item, i) in styleOptionsItens">
                <p class="ma-2 text-body-1 font-weight-medium" :key="i">
                    <v-icon :icon="item.groupIcon"></v-icon>
                    {{ item.groupText }}
                </p>
                <v-btn class="ma-2" elevation="5" v-for="(group) in item.groupItens" @click="onOpenProp(group.prop)">
                    {{ group.text }}
                </v-btn>
            </div>
        </v-card-text>

        <v-card-text v-else>
            <v-card-text>
                <v-row id="style-options" class="mb-2 justify-end">
                    <v-col cols="4" md="2" lg="1" class="pa-0 px-1">
                        <v-btn prepend-icon="mdi-close" variant="text" @click="onChooseAction('onClose')">Fechar</v-btn>
                    </v-col>
                    <v-col cols="4" md="2" lg="1" class="pa-0 px-1">
                        <v-btn :color="Colors.OXFORD_BLUE_LIGHT" @click="onChooseAction('onApply')">Aplicar</v-btn>
                    </v-col>
                    <v-col cols="4" md="2" lg="1" class="pa-0 px-1">
                        <v-btn :color="Colors.OXFORD_BLUE" variant="tonal" @click="onChooseAction('onApplyForAll')">p/ Todos</v-btn>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center">
                    <styleOptionsComponents 
                        :prop="prop" 
                        :action="action" 
                        @on-close="onClose" 
                        @on-clean-action="cleanAction" />
                </v-row>
            </v-card-text>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { DialogProps } from "@/enums/dialog-prop"
import { Colors } from "@/enums/colors"

const emit = defineEmits(["onClick", "onApply"])

let expand = ref(false);
let prop = ref("");
let action = ref("")

const styleOptionsItens = [
    {
        groupText: "imagem",
        groupIcon: "mdi-image",
        groupItens: [
            {
                text: "Imagem de Fundo",
                prop: DialogProps.IMAGES,
            }
        ]
    },
    {
        groupText: "Cor",
        groupIcon: "mdi-palette",
        groupItens: [
            {
                text: "Cor de Fundo",
                prop: DialogProps.BACKGROUND_COLOR,
            },
            {
                text: "Cor da Fonte",
                prop: DialogProps.FONT_COLOR,
            }
        ]
    },
    {
        groupText: "Fonte",
        groupIcon: "mdi-format-text",
        groupItens: [
            {
                text: "Fonte",
                prop: DialogProps.FONT_FAMILY,
            },
            {
                text: "Tamanho da Fonte",
                prop: DialogProps.FONT_SIZE,
            },
            {
                text: "Estilo da Fonte",
                prop: DialogProps.ITALIC,
            }
        ]
    },
    {
        groupText: "Alinhamento",
        groupIcon: "mdi-format-horizontal-align-center",
        groupItens: [
            {
                text: "Alinhamento Horizontal",
                prop: DialogProps.ALIGN,
            },
            {
                text: "Alinhamento Vertical",
                prop: DialogProps.VALIGN,
            },
            {
                text: "Margem",
                prop: DialogProps.MARGIN,
            }
        ]
    }
]

function onOpenProp(propSelected: string) {
    prop.value = propSelected
    toggleExpand()
}

function onChooseAction(actionSelected: string) {
    action.value = actionSelected
}

function onClose() {
    closeExpand()
    cleanProp()
    cleanAction()
}

function cleanProp() {
    prop.value = ""
}

function cleanAction() {
    action.value = ""
}

function toggleExpand() {
    expand.value = !expand.value
}

function closeExpand() {
    expand.value = false
}

</script>

<style scoped>

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

</style>

