<template lang="pug">
    v-dialog(
        ref="formDate"
        v-model="activated"
        width="290px"
        persistent
        :close-on-content-click="false"
    )
        template(#activator="{on, attrs}")
            v-text-field.unstyled(
                v-bind="$attrs"
                v-on="$listeners"
                type="date"
                :min="min"
                :max="max"
            )
        v-date-picker(
            v-model="date"
            @input="$emit('input', $event)"
            locale="fr"
            scrollable
            ref="formPicker"
            :min="min"
            :max="max"
        )
            v-btn(text @click="date = null" color="info") Vider
            v-spacer
            v-btn(text @click="activated = false" color="error") Annuler
            v-btn(text @click="$refs.formDate.save(date)" color="success") Valider
</template>

<script>
    export default {
        props: {
            activePicker: {
                type: String,
                default:null
            },
            min: {
                type: String,
                default: '1970-01-01'
            },
            max: {
                type: String,
                default: '2999-01-01'
            }
        },
        data: () => ({
            activated: false,
            date: null
        }),
        watch: {
            value: {
                handler(date) {
                    this.date = date
                },
                immediate: true
            },
            dialog (dialog) {
                if(this.dialogMod) {
                    dialog && setTimeout(() => {
                        this.$refs.formPicker.activePicker = this.activePicker
                    })
                }
            }
        },
        methods: {
            open() {
                this.activated = true
            }
        }
    }
</script>

<style>
    .unstyled input::-webkit-inner-spin-button,
    .unstyled input::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
</style>
