<template>
    <v-row class="mt-10 mb-4 d-flex justify-center">
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn :color="Colors.OXFORD_BLUE" variant="tonal" v-bind="props">{{ title }}</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(style, i) in itens" @click="onClick(style.prop)">
                    <v-list-item-title :key="i">{{ style.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-row>
</template>

<script setup lang="ts">
import { Colors } from "@/enums/colors"

const props = defineProps({
    title: {type: String, required: true},
    itens: {type: Array<{text: string, prop: string}>, required: true}
})

const { title, itens } = toRefs(props)

const emit = defineEmits(["onClick"])

function onClick(prop: string) {
    emit("onClick", prop)
}

</script>