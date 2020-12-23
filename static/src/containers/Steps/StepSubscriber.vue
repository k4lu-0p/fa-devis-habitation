<template lang="pug">
    v-form(
        lazy-validation 
        v-on:submit.prevent
    )
        v-card-text.py-0
            //- Nom
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy.trim="lastname"
                        required
                        :error-messages="lastnameErrors"
                        @input="$v.lastname.$touch()"
                        @blur="$v.lastname.$touch()"
                        :prepend-icon="$const.fields.subscriber.lastname.icon"
                        :label="$const.fields.subscriber.lastname.label"
                        format="uppercase"
                    )
            
            //- Prénom
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy.trim="firstname"
                        required
                        :error-messages="firstnameErrors"
                        @input="$v.firstname.$touch()"
                        @blur="$v.firstname.$touch()"
                        :prepend-icon="$const.fields.subscriber.firstname.icon"
                        :label="$const.fields.subscriber.firstname.label"
                        format="ucfirst"
                    )
            
            //- Civilité
            v-row
                v-col.py-1(cols="12")
                    input-select(
                        v-model="civility"
                        required
                        :error-messages="civilityErrors"
                        @input="$v.civility.$touch()"
                        @blur="$v.civility.$touch()"
                        :items="$const.fields.subscriber.civility.choices"
                        :prepend-icon="$const.fields.subscriber.civility.icon"
                        :label="$const.fields.subscriber.civility.label"
                    )
            
            //- Situation familiale
            v-row
                v-col.py-1(cols="12")
                    input-select(
                        v-model="familySituation"
                        required
                        :error-messages="familySituationErrors"
                        @input="$v.familySituation.$touch()"
                        @blur="$v.familySituation.$touch()"
                        :items="$const.fields.subscriber.familySituation.choices"
                        :prepend-icon="$const.fields.subscriber.familySituation.icon"
                        :label="$const.fields.subscriber.familySituation.label"
                    )

            //- Travail
            v-row
                v-col.py-1(cols="12")
                    input-select(
                        v-model="job"
                        required
                        :error-messages="jobErrors"
                        @input="$v.job.$touch()"
                        @blur="$v.job.$touch()"
                        :items="$const.fields.subscriber.job.choices"
                        :prepend-icon="$const.fields.subscriber.job.icon"
                        :label="$const.fields.subscriber.job.label"
                    )
            
            //- Date de naissance
            v-row
                v-col.py-1(cols="12")
                    input-date(
                        ref="birthDate"
                        required
                        v-model.lazy="birthDate"
                        :error-messages="birthDateErrors"
                        @input="$v.birthDate.$touch()"
                        @blur="$v.birthDate.$touch()"
                        :label="$const.fields.subscriber.birthDate.label"
                        :prepend-icon="$const.fields.subscriber.birthDate.icon"
                        @click:prepend="$refs.birthDate.open()"
                        active-picker="YEAR"
                    )

            //- Email
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="email"
                        required
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        :label="$const.fields.subscriber.email.label"
                        :prepend-icon="$const.fields.subscriber.email.icon"
                    )
            
            //- Téléphone
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="phone"
                        required
                        :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                        :label="$const.fields.subscriber.phone.label"
                        :prepend-icon="$const.fields.subscriber.phone.icon"
                    )
            
            //- Adresse
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="address"
                        required
                        :error-messages="addressErrors"
                        @input="$v.address.$touch()"
                        @blur="$v.address.$touch()"
                        :label="$const.fields.subscriber.address.label"
                        :prepend-icon="$const.fields.subscriber.address.icon"
                    )
            
            //- Complément d'adresse
            v-row
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="additionalAddress"
                        :prepend-icon="$const.fields.subscriber.additionalAddress.icon"
                        :label="$const.fields.subscriber.additionalAddress.label"
                    )
            
            //- Code postal / Ville
            v-row
                v-col.py-1(cols="12")
                    input-commune-autocomplete(
                        v-model="city"
                        :prepend-icon="$const.fields.subscriber.city.icon"
                        :error-messages="cityErrors"
                        :label="$const.fields.subscriber.city.label"
                        @blur="$v.city.$touch()"
                    )
    
            //- Le bien à assurer se situe à la même adresse
            v-row
                v-col.py-1.pl-8(cols="12")
                    input-radio-list(
                        v-model="hasPropertySameAddress"
                        required
                        :error-messages="hasPropertySameAddressErrors"
                        @input="$v.hasPropertySameAddress.$touch()"
                        @blur="$v.hasPropertySameAddress.$touch()"
                        :items="$const.fields.subscriber.hasPropertySameAddress.choices"
                        :label="$const.fields.subscriber.hasPropertySameAddress.label"
                        column
                    )
            
            //- Adresse du bien à assurer
            v-row(v-if="hasPropertySameAddress === false")
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="addressProperty"
                        required
                        :error-messages="addressPropertyErrors"
                        @input="$v.addressProperty.$touch()"
                        @blur="$v.addressProperty.$touch()"
                        :label="$const.fields.property.addressProperty.label"
                        :prepend-icon="$const.fields.property.addressProperty.icon"
                    )
            
            //- Complément d'adresse du bien à assurer
            v-row(v-if="hasPropertySameAddress === false")
                v-col.py-1(cols="12")
                    input-text(
                        v-model.lazy="additionalPropertyAddress"
                        :prepend-icon="$const.fields.property.additionalPropertyAddress.icon"
                        :label="$const.fields.property.additionalPropertyAddress.label"
                    )

            //- Code postal / Ville du bien à assurer
            v-row(v-if="hasPropertySameAddress === false")
                v-col.py-1(cols="12")
                    input-commune-autocomplete(
                        v-model="cityProperty"
                        :prepend-icon="$const.fields.property.cityProperty.icon"
                        :error-messages="cityPropertyErrors"
                        :label="$const.fields.property.cityProperty.label"
                        @blur="$v.cityProperty.$touch()"
                    )
            
        //- Navigation
        //- v-divider

        v-card-actions
            v-spacer
            v-btn(
                color="primary"
                @click="next"
                depressed
                :disabled="$v.$invalid"
            )
                span Suivant
                v-icon(
                    right
                    v-text="!$v.$invalid ? 'mdi-arrow-right' : 'mdi-lock-outline'"
                )

</template>

<script>
import InputCommuneAutocomplete from '../../components/Inputs/InputCommuneAutocomplete';

import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import rulesMixin  from '../../mixins/validator/rules';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required, email, helpers } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate

// Todo : move this
const phoneFrenchRegex = helpers.regex('phoneFrenchRegex', /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/)

export default {
    name: 'SubscriberStep',
    mixins: [
        validationMixin,
        errorsMixin,
        rulesMixin,
    ],
    components: {
        InputCommuneAutocomplete,
    },
    data() {
        return {
            stepName: 'subscriber',
            stepNumber: 1,
        }
    },
    computed: {
        /**  Génère les variables computed (v-model des champs) 
        en les liants avec le store (à l'aide des setters/getters) */
        ...mapStepFieldsToStore([
            'firstname',
            'lastname',
            'civility',
            'familySituation',
            'address',
            'additionalAddress',
            'city',
            'birthDate',
            'hasPropertySameAddress',
            'job',
            'email',
            'phone',
        ], 'subscriber'),
        ...mapStepFieldsToStore([
            'addressProperty',
            'additionalPropertyAddress',
            'cityProperty',
        ], 'property')
    },
    validations() {
        let rules = {
            firstname: { required },
            lastname: { required },
            civility: { required },
            job: { required },
            email: { email, required },
            phone: { required, phoneFrenchRegex },
            familySituation: { required },
            address: { required },
            city: { required },
            birthDate: { required, checkBirthdate: this.checkBirthdate },
            hasPropertySameAddress: { required },
        }

        if (!this.hasPropertySameAddress) {
            rules = {
                ...rules,
                addressProperty: { required },
                cityProperty: { required },
            }
        }

        return rules;
    },
    methods: {
        next() {
            // Si c'est la même adresse pour le bien
            if (this.hasPropertySameAddress) {
                let stepName = 'property';
                this.$store.commit('UPDATE_STEP_DATA', { stepName, stepData: { addressProperty: this.address }, });
                this.$store.commit('UPDATE_STEP_DATA', { stepName, stepData: { additionalPropertyAddress: this.additionalAddress }, });
                this.$store.commit('UPDATE_STEP_DATA', { stepName, stepData: { cityProperty: this.city }, });
            }
            this.$emit('next');
        },
    }
}
</script>

<style>

</style>