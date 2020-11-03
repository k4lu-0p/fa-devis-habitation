<template lang="pug">
    v-card(outlined width="100%" max-width="1000px")
        v-toolbar(color="transparent" flat dense)
            v-toolbar-title(color="primary") Devis habitation

        v-divider

        v-stepper(
            alt-labels
            :value="currentStep"
        )
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
                            @validation="handleStepValidation"
                        )
                v-stepper-content(step="2")
                    v-sheet
                        StepPropertyDescription(
                            @validation="handleStepValidation"
                        )
                v-stepper-content(step="3")
                    v-sheet
                        StepAdditionalInformations(
                            @validation="handleStepValidation"
                        )
                v-stepper-content(step="4")
                    v-sheet
                        StepEstimate(
                            @validation="handleStepValidation"
                        )
                        
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

import { mapGetters } from 'vuex';

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
            valid: false,
        }
    },
    computed: {
        ...mapGetters({
            maxStep: 'getMaxStepNumber',
            minStep: 'getMinStepNumber',
        }),
        currentStep: {
            get() {
                return this.$store.getters['getCurrentStepNumber'];
            },
            set(value) {
                this.$store.commit('UPDATE_CURRENT_STEP_NUMBER', value);
            },
        }
    },
    methods: {
        // Trigger à chaque fois que $v.$invalid change dans une step
        handleStepValidation(event) {
            const { 
                isStepValid,
                stepNumber,
                stepName,
            } = event;
            // Le bouton suivant est disponible lorsque l'étape courrante est validée.
            // Le bouton suivant doit revenir à l'état disabled une fois arrivé sur une nouvelle étape.
            // Donc valid doit repasser à false.
            if (stepNumber === this.currentStep) {
                this.valid = event.isStepValid;
            }
        },
        handleChangeStep(event) {
            console.log("coucou");
            console.log(event);
        },
        next() {

            console.log(this.$store.getters['getCurrentStepName']);

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

<style lang="scss">
.v-stepper, .v-stepper__header  {
    box-shadow: none !important;
}
</style>