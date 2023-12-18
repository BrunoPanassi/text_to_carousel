<template>
    <backgroundColorStyle v-if="prop == DialogProps.BACKGROUND_COLOR" @on-pick="onPick" />
</template>

<script setup lang="ts">
import backgroundColorStyle from './background-color-style.vue';
import { DialogProps } from '~/enums/dialog-prop';

const props = defineProps({
    prop: { type: String, required: true}
})
const { prop } = toRefs(props);

const emit = defineEmits(["onPick"])

function onPick(value: string | number) {
    emit("onPick", {
        prop: prop,
        value: value
    })
}

</script>
