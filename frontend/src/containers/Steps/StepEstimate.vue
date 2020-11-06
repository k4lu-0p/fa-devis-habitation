<template lang="pug">
    v-form(
        lazy-validation 
        v-on:submit.prevent
    )   
        template(v-if="hasApiAnswer")
            v-card-text.py-0
                v-row
                    v-col.py-1(cols="12")
                        h2 Votre simulation

                //- Code commercial
                v-row
                    v-col.py-1(cols="12")
                        input-text(
                            v-model.lazy.trim="commercialCode"
                            required
                            :error-messages="commercialCodeErrors"
                            @input="$v.commercialCode.$touch()"
                            @blur="$v.commercialCode.$touch()"
                            :prepend-icon="$const.fields.estimate.commercialCode.icon"
                            :label="$const.fields.estimate.commercialCode.label"
                            format="uppercase"
                        )

                //- Garanties souhaitées
                v-row
                    v-col.py-1(cols="12")
                        input-radio-list(
                            v-model.lazy.trim="desiredGuarantee"
                            required
                            :error-messages="desiredGuaranteeErrors"
                            @input="$v.desiredGuarantee.$touch()"
                            @blur="$v.desiredGuarantee.$touch()"
                            :label="$const.fields.estimate.desiredGuarantee.label"
                            :items="$const.fields.estimate.desiredGuarantee.choices"
                            row
                        )
                
                v-divider

            v-card-text.pb-0


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
                    color="secondary"
                    depressed
                    @click="cancel"
                )
                    span Annuler

                v-btn(
                    color="primary"
                    depressed
                    @click="fetchEstimate"
                )
                    span Recevoir le devis            
</template>

<script>
import { mapGetters } from 'vuex';
import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate

export default {
    name: 'EstimateStep',
    mixins: [errorsMixin],
    data() {
        return {
            stepName: 'estimate',
            stepNumber: 4,
            isStepValid: false,
        }
    },
    validations: {
        commercialCode: { required },
        desiredGuarantee: { required },
    },
    computed: {
        ...mapStepFieldsToStore([
            'commercialCode',
            'desiredGuarantee',
        ], 'estimate'),
        ...mapGetters({
            responseApiData: 'getResponseApiData',
            hasApiAnswer: 'hasApiAnswer',
        }),
    },
    methods: {
        next() { this.$emit('next'); },
        previous() { this.$emit('previous'); },
        cancel() { console.log('annuler'); },
        fetchEstimate() { console.log('recevoir le devis'); }
    },
}
</script>

<style>

</style>