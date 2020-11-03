<template lang="pug">
    v-radio-group.mt-0.pt-0.v--radioized(
        v-bind="$attrs"
        v-on="$listeners"
        :mandatory="false"
        :value="value"
        @change="$emit('input', $event)"
    )
        template(#label)
            div(:style="{width: '100vw', lineHeight: '24px'}" v-text="label")
        v-radio.mt-2(
            v-for="(item, key) in items"
            :key="key"
            :value="item.value"
            :label="item.text"
            :ripple="true"
        )
</template>

<script>
    export default {
        props: {
            value: {},
            items: {
                type: Array,
                required: true
            },
            label: {
                type: String,
                default: null
            }
        }
    }
</script>

<style>
    .v--radioized .v-input__slot {
        margin-bottom: 4px;
    }
</style>
