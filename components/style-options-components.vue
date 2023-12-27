<template>
    <backgroundColorStyle 
        v-if="prop == DialogProps.BACKGROUND_COLOR" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <fontColorStyle
        v-if="prop == DialogProps.FONT_COLOR" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <fontFamilyStyle
        v-if="prop == DialogProps.FONT_FAMILY" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <fontSizeStyle
        v-if="prop == DialogProps.FONT_SIZE" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <horizontalAlignStyle
        v-if="prop == DialogProps.ALIGN" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <verticalAlignStyle
        v-if="prop == DialogProps.VALIGN" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
</template>

<script setup lang="ts">
import backgroundColorStyle from './background-color-style.vue';
import fontColorStyle from './font-color-style.vue';
import fontFamilyStyle from './font-family-style.vue';
import fontSizeStyle from './font-size-style.vue';
import horizontalAlignStyle from './horizontal-align-style.vue';
import verticalAlignStyle from './vertical-align-style.vue';
import { DialogProps } from '~/enums/dialog-prop';

const props = defineProps({
    prop: { type: String, required: true},
    action: {Type: String, required: false, default: ""}
})
const { prop, action } = toRefs(props);

const emit = defineEmits(["onClose", "onCleanAction"])

function onClose() {
    emit("onClose")
}

function onCleanAction() {
    emit("onCleanAction")
}

</script>
