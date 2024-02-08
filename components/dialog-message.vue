<template>
    <v-dialog v-model="dialogClicked" max-width="400">
        <v-card>
            <template v-slot:prepend>
                <p class="font-weight-black">
                    {{ title }}
                </p>
            </template>
            <template v-slot:append>
                <v-btn @click="onClose" icon="mdi-close" variant="text"></v-btn>
            </template>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="flat" :color="Colors.OXFORD_BLUE_LIGHT" @click="onClose">{{ ok }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { Colors } from "@/enums/colors"

const title = "Alerta"
const ok = "OK"

const props = defineProps({
    dialogClicked: { type: Boolean, required: true},
    message: { type: String, required: true}
})

const { dialogClicked, message } = toRefs(props)

const emit = defineEmits(["onClose"])

function onClose(confirm: boolean) {
    emit("onClose", confirm)
}

</script>