<template>
    <v-dialog v-model="dialogClicked" max-width="400">
        <v-card>
            <v-card-text>
                {{ confirmText }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onConfirm(false)">{{ no }}</v-btn>
                <v-btn variant="flat" :color="Colors.OXFORD_BLUE_LIGHT" @click="onConfirm(true)">{{ yes }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { Colors } from "@/enums/colors"

const yes = "Sim"
const no = "Não"

const confirmText = "Confirma aplicar para todas as imagens?"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true}
})

const { dialogClicked } = toRefs(props)

const emit = defineEmits(["onConfirm"])

function onConfirm(confirm: boolean) {
    emit("onConfirm", confirm)
}

</script>