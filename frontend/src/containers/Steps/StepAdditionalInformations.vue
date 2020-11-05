<template lang="pug">
    v-form(
        lazy-validation 
        v-on:submit.prevent
    )
        
        section(v-for="(section, name, index) in $const.fields.additional")
            v-divider.my-6(v-if="index !== 0")
            h1.font-weight-medium  {{ section.title }}
            v-row(v-for="(question, questionIndex) in section.questions")
                v-col.pb-1.pt-2(cols="9")
                
                    //- Si tooltip
                    div.d-flex.flex-row.align-center(
                        v-if="question.tooltip && question.tooltip.length > 0"
                        style="height: 100%;"
                    )
                        v-tooltip(right)
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ question.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span {{ question.tooltip }}

                    //- Sinon
                    div.d-flex.flex-row.align-center(
                        v-else
                        style="height: 100%;"
                    )
                        p.mb-0.font-weight-medium {{ question.label }}

                v-col.py-1(cols="3")
                    input-radio-list(
                        v-model="_self[questionIndex]"
                        required
                        :items="question.choices"
                        row
                    )

        //- Navigation
        v-card-actions
            v-spacer
            v-btn(
                color="gray darken-3"
                @click="previous"
                depressed
            )
                v-icon(left) mdi-arrow-left
                span Précédent
            v-btn(
                color="primary"
                @click="next"
                depressed
            )
                span Suivant
                v-icon(right) mdi-arrow-right

</template>

<script>
import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate

export default {
    name: 'AdditionalInformationsStep',
    data() {
        return {
            stepName: 'informations',
            stepNumber: 3,
            isStepValid: false,
        }
    },
    computed: {
        ...mapStepFieldsToStore([
            'isBuildedWithHeavyMaterials',
            'isCoveredWithHeavyMaterials',
            'hasWoodenSkeleton',
            'hasSwimmingPool',
            'hasVeranda',
            'hasSolarPannels',
            'hasClosedFireplace',
            'hasOpenedFireplace',
            'isOnUnbuildableLand',
            'isHistoricalMonument',
            'hasPartiallyProUse',
            'isCastleType',
            'isInsulated',
            'hasAlreadyTerminatedContract',
            'hasNoDisaster',
        ], 'additional')
    },
    methods: {
        next() { this.$emit('next') },
        previous() { this.$emit('previous') },
    },
    mounted() {
    }
}
</script>

<style>

</style>