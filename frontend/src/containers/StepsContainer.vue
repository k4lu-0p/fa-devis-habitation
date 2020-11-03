<template lang="pug">
    v-card(outlined width="100%" max-width="1000px")
        v-toolbar(color="transparent" flat dense)
            v-toolbar-title(color="primary") Devis habitation

        v-divider

        v-stepper(alt-labels :value="currentStep")
            v-stepper-header
                v-stepper-step(step="1") Le souscripteur
                v-divider
                v-stepper-step(step="2") Descriptif du bien
                v-divider
                v-stepper-step(step="3") Informations complémentaires
                v-divider
                v-stepper-step(step="4") Le devis

            v-stepper-items
                v-divider
                v-stepper-content(step="1")
                    v-sheet
                        StepSubscriber(
                            :steps-data="stepsData"
                            @validation="validation"
                        )
                v-stepper-content(step="2")
                    v-sheet
                        StepPropertyDescription(
                            :steps-data="stepsData"
                            @validation="validation"
                        )
                v-stepper-content(step="3")
                    v-sheet
                        StepAdditionalInformations(
                            :steps-data="stepsData"
                            @validation="validation"
                        )
                v-stepper-content(step="4")
                    v-sheet
                        StepEstimate(:steps-data="stepsData")
                        
        v-divider

        v-card-actions
            v-spacer
            v-btn(
                color="gray darken-3"
                @click="previous"
                depressed
                v-if="currentStep > minStep"
            )
                v-icon(left) mdi-arrow-left
                span Précédent
            v-btn(
                color="primary"
                @click="next"
                depressed
                :disabled="!valid"
                v-if="currentStep < maxStep"
            )
                span Suivant
                v-icon(right v-text="'mdi-lock-outline'")
</template>

<script>
import StepSubscriber from './Steps/StepSubscriber';
import StepPropertyDescription from './Steps/StepPropertyDescription';
import StepAdditionalInformations from './Steps/StepAdditionalInformations';
import StepEstimate from './Steps/StepEstimate';

export default {
    name: 'Stepper',
    components: {
        StepSubscriber,
        StepPropertyDescription,
        StepAdditionalInformations,
        StepEstimate,
    },
    data() {
        return {
            maxStep: 4,
            minStep: 1,
            currentStep: 1,
            valid: false,
        }
    },
    props: {
        stepsData: {
            type: Object,
            required: true,
        },
    },
    methods: {
        validation(event) {
            console.log('Checking validation...'); // DEBUG
            console.log(event); // DEBUG
        },
        next() {
            console.log(this.stepsData) // DEBUG

            if (this.currentStep < this.maxStep) {
                this.currentStep++;
                return this.$emit('next');
            }
            return this.$emit('finish');
        },
        previous() {
            if (this.currentStep > this.minStep) {
                this.currentStep--;
                this.$emit('previous');
            }
        }
    },
}
</script>