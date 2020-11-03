<template lang="pug">
    app-layout
        steps-container(@finish="submit")
</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';
import StepsContainer from '../containers/StepsContainer.vue';

export default {
    name: 'Index',
    components: {
        AppLayout,
        StepsContainer,
    },
    data() {
        return {
            
        }
    },
    methods: {
        submit() {
            console.log("SUBMIT DATA");
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
