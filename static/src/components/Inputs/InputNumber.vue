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
            },
            numType: {
                type: String,
                default: true,
            }
        },
        methods: {
            increment () {
                let emit = (parseInt(this.value || 0) + this.step);

                if (this.numType === 'integer') {
                    let emit = (parseFloat(this.value || 0) + this.step)
                        .toFixed(this.decimals)
                }

                if (typeof this.max !== 'undefined' && emit <= this.max) {
                    return this.$emit('input', emit)
                }
            },
            decrement () {
                let emit = (parseInt(this.value || 0) - this.step);

                if (this.numType === 'float') {
                    emit = (parseFloat(this.value || 0) - this.step)
                        .toFixed(this.decimals)
                }

                if (typeof this.min !== 'undefined' && emit >= this.min) {
                    return this.$emit('input', emit)
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
