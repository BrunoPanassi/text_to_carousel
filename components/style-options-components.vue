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
    <fontStyle
        v-if="prop == DialogProps.ITALIC" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <marginStyle
        v-if="prop == DialogProps.MARGIN" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
    <backgroundImage
        v-if="prop == DialogProps.IMAGES" 
        :action="action"
        @on-close="onClose"
        @on-clean-action="onCleanAction"
    />
</template>

<script setup lang="ts">
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
