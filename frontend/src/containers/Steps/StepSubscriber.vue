<template lang="pug">
    v-form(
        ref="formSubscriber"
        lazy-validation 
        v-on:submit.prevent
    )

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
                    v-model.lazy="civility"
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
                    v-model.lazy="familySituation"
                    required
                    :error-messages="familySituationErrors"
                    @input="$v.familySituation.$touch()"
                    @blur="$v.familySituation.$touch()"
                    :items="$const.fields.subscriber.familySituation.choices"
                    :prepend-icon="$const.fields.subscriber.familySituation.icon"
                    :label="$const.fields.subscriber.familySituation.label"
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
        
        //- Code postal / Ville (To do)
        //- v-row
            v-col.py-1(cols="12")
                input-autocomplete(
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                    :error-messages="cityErrors"
                    v-model="stepsData.subscriber.city"
                    prepend-icon="mdi-mailbox-open-up"
                    :api="{url: '/api/base/communes/search'}"
                    label="Code postal / Ville"
                    @change="makeCommonAddress(displayers.commonAddress)"
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
        
        //- Le bien à assurer se situe ...
        v-row
            v-col.py-1.pl-8(cols="12")
                input-radio-list(
                    v-model.lazy="hasPropertySameAddress"
                    required
                    :error-messages="hasPropertySameAddressErrors"
                    @input="$v.hasPropertySameAddress.$touch()"
                    @blur="$v.hasPropertySameAddress.$touch()"
                    :items="$const.fields.subscriber.hasPropertySameAddress.choices"
                    :label="$const.fields.subscriber.hasPropertySameAddress.label"
                    column
                )
        //- Code postal / Ville du bien à assurer (To do)
        //- v-row
            v-col.py-1(cols="12")
                input-autocomplete(
                    @input="$v.cityProperty.$touch()"
                    @blur="$v.cityProperty.$touch()"
                    :error-messages="cityPropertyErrors"
                    v-model="stepsData.subscriber.cityProperty"
                    prepend-icon="mdi-mailbox-open-up"
                    :api="{url: '/api/base/communes/search'}"
                    label="Code postal / Ville"
                    @change="makeCommonAddress(displayers.commonAddress)"
                )

</template>

<script>

import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate

export default {
    name: 'SubscriberStep',
    mixins: [
        validationMixin,
        errorsMixin,
    ],
    watch: {
        // Remonte l'état de la validation du formulaire de l'étape au StepsContainer
        '$v.$invalid': {
            handler(value) {
                this.$emit('validation', {
                    stepName: this.stepName,
                    stepNumber: this.stepNumber,
                    isStepValid: !value,
                })
            }
        }
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
            'cityProperty',
        ], 'subscriber')
    },
    validations: {
        firstname: { required },
        lastname: { required },
        civility: { required },
        familySituation: { required },
        address: { required },
        // additionalAddress: { required }, // Unrequired
        // city: { required }, // Todo
        birthDate: { required },
        hasPropertySameAddress: { required },
        // cityProperty: { required }, // Todo
    },
    
}
</script>

<style>

</style>