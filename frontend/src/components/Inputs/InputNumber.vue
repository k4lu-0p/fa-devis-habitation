<template lang="pug">
    v-text-field.v--numberized(
        v-bind="$attrs"
        v-on="$listeners"
        :max="max"
        type="number"
        :value="value"
        :min="min"
        :step="step"
    )
        template(#append)
            v-btn(icon ripple small)
                v-icon(@click="decrement") mdi-minus
            v-btn(icon ripple small)
                v-icon(@click="increment") mdi-plus
</template>

<script>
    export default {
        props: {
            value: {},
            min: Number,
            max: Number,
            step: {
                type: Number,
                default: 1
            },
            decimals: {
                type: Number,
                default: 2
            }
        },
        methods: {
            increment () {
                let emit = (parseFloat(this.value || 0) + this.step)
                    .toFixed(this.decimals)

                if (typeof this.max !== 'undefined' && emit <= this.max) {
                    this.$emit('input', emit)
                }
            },
            decrement () {
                let emit = (parseFloat(this.value || 0) - this.step)
                    .toFixed(this.decimals)

                if (typeof this.min !== 'undefined' && emit >= this.min) {
                    this.$emit('input', emit)
                }
            }
        }
    }
</script>

<style>
    .v--numberized input::-webkit-outer-spin-button,
    .v--numberized input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .v--numberized input[type=number] {
        -moz-appearance: textfield;
    }
</style>
