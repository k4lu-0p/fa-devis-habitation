<template lang="pug">
    v-text-field(
        v-bind="$attrs"
        :value="value"
        @input="onInput"
        @change="$emit('change', $event)"
        @blur="$emit('blur')"
    )
</template>

<script>
    export default {
        props: {
            value: {},
            type: {
                type: String,
                default: 'text'
            },
            format: {
                type: String,
                default: null
            }
        },
        methods: {
            onInput(event) {
                if (this.format && this.type === 'text' && event) {
                    switch (this.format) {
                        case 'uppercase':
                            event = event.toUpperCase();
                            break;
                        case 'ucfirst':
                            event = event.charAt(0).toUpperCase() + event.slice(1);
                            break;
                    }
                }
                
                return this.$emit('input', event);
            }
        }
    }
</script>
