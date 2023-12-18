<template>
    <v-card>
        <v-card-text>
            <div v-for="(item, i) in styleOptionsItens">
                <p :key="i">{{ item.groupText }}</p>
                <v-btn v-for="(group) in item.groupItens" @click="expand = !expand">
                    {{ group.text }}
                </v-btn>
            </div>
        </v-card-text>

        <v-expand-transition>
            <v-card v-if="expand" class="v-card--reveal overflow-auto" style="height: 100%">
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <v-color-picker width="200" mode="hexa"></v-color-picker>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row class="d-flex justify-center">
                                <v-btn class="ml-10" color="blue" @click="expand = false">Aplicar</v-btn>
                                <v-btn class="ml-10 mt-2" color="blue" @click="expand = false">p/ Todos</v-btn>
                                <v-btn class="ml-10 mt-2" @click="expand = false">Fechar</v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>

<script setup lang="ts">
import menuListItem from "~/components/menu-list-item.vue";
import { DialogProps } from "@/enums/dialog-prop"

const emit = defineEmits(["onClick"])

let expand = ref(false);
let prop = ref("");

const imageStyleTitle = "Estilo da Imagem"

const styleOptionsItens = [
    {
        groupText: "Cor",
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
        groupItens: [
            {
                text: "Fonte",
                prop: DialogProps.FONT_FAMILY,
            },
            {
                text: "Tamanho da Fonte",
                prop: DialogProps.FONT_SIZE,
            }
        ]
    },
    {
        groupText: "Alinhamento",
        groupItens: [
            {
                text: "Alinhamento Horizontal",
                prop: DialogProps.ALIGN,
            },
            {
                text: "Alinhamento Vertical",
                prop: DialogProps.VALIGN,
            }
        ]
    }
]

function onOpenProp(propSelected: string) {
    prop.value = propSelected
}

function onClick(prop: string) {
    emit("onClick", prop)
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