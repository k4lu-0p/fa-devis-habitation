<template lang="pug">
    app-layout
        steps-container(@next="middlewareSteps")
        v-overlay(:value="loading")
            v-progress-circular(indeterminate size="64")

</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';
import StepsContainer from '../containers/StepsContainer.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Index',
    components: {
        AppLayout,
        StepsContainer,
    },
    computed: {
        ...mapGetters({
            maxStep: 'getMaxStepNumber',
            minStep: 'getMinStepNumber',
            loading: 'getLoading',
        }),
    },
    methods: {
        // à chaques validation d'étape
        middlewareSteps(currentStep) {
            // soumission du formulaire arrivé à l'étape 4
            if (currentStep === 4) {
                this.$store.dispatch('fetchFormulasWithStepsData', false);
            }
        }
    }
}
</script>

<style lang="scss">
    .header-divider {
        margin-bottom: 0 !important;
        border-top-width: 10px !important;
        border-color: var(--v-primary-base) !important;
    }
</style>
