<template lang="pug">
    v-form(
        ref="formSubscriber"
        lazy-validation 
        v-on:submit.prevent
        v-model="isStepValid"
    )

        //- Nom
        v-row
            v-col.py-1(cols="12")
                input-text(
                    v-model="stepsData.subscriber.lastname"
                    :rules="[v => !!v || $const.fields.subscriber.lastname.rules.required]"
                    :prepend-icon="$const.fields.subscriber.lastname.icon"
                    :label="$const.fields.subscriber.lastname.label"
                    format="uppercase"
                )
        
        //- Prénom
        v-row
            v-col.py-1(cols="12")
                input-text(
                    v-model="stepsData.subscriber.firstname"
                    :rules="[v => !!v || $const.fields.subscriber.firstname.rules.required]"
                    :prepend-icon="$const.fields.subscriber.firstname.icon"
                    :label="$const.fields.subscriber.firstname.label"
                    format="ucfirst"
                )
        
        //- Civilité
        v-row
            v-col.py-1(cols="12")
                input-select(
                    v-model="stepsData.subscriber.civility"
                    :rules="[v => !!v || $const.fields.subscriber.civility.rules.required]"
                    :items="$const.fields.subscriber.civility.choices"
                    :prepend-icon="$const.fields.subscriber.civility.icon"
                    :label="$const.fields.subscriber.civility.label"
                )
        
        //- Situation familiale
        v-row
            v-col.py-1(cols="12")
                input-select(
                    v-model="stepsData.subscriber.familySituation"
                    :rules="[v => !!v || $const.fields.subscriber.familySituation.rules.required]"
                    :items="$const.fields.subscriber.familySituation.choices"
                    :prepend-icon="$const.fields.subscriber.familySituation.icon"
                    :label="$const.fields.subscriber.familySituation.label"
                )
        
        //- Adresse
        v-row
            v-col.py-1(cols="12")
                input-text(
                    v-model="stepsData.subscriber.address"
                    :rules="[v => !!v || $const.fields.subscriber.address.rules.required]"
                    :label="$const.fields.subscriber.address.label"
                    :prepend-icon="$const.fields.subscriber.address.icon"
                )
        
        //- Complément d'adresse
        v-row
            v-col.py-1(cols="12")
                input-text(
                    v-model="stepsData.subscriber.additionalAddress"
                    :prepend-icon="$const.fields.subscriber.additionalAddress.icon"
                    :label="$const.fields.subscriber.additionalAddress.label" 
                )
        
        //- Code postal / Ville
        //- v-row
            v-col.py-1(cols="12")
                input-autocomplete(
                    :rules="[v => !!v || 'Veuillez choisir un code postal / une ville']"
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
                    v-model="stepsData.subscriber.birthDate"
                    :rules="[v => !!v || $const.fields.subscriber.birthDate.rules.required]"
                    :label="$const.fields.subscriber.birthDate.label"
                    :prepend-icon="$const.fields.subscriber.birthDate.icon"
                    @click:prepend="$refs.birthDate.open()"
                    active-picker="YEAR"
                )
        
        //- Le bien à assurer se situe ...
        v-row
            v-col.py-1.pl-8(cols="12")
                input-radio-list(
                    v-model="stepsData.subscriber.hasPropertySameAddress"
                    :items="$const.fields.subscriber.hasPropertySameAddress.choices"
                    :label="$const.fields.subscriber.hasPropertySameAddress.label"
                    column
                )
        //- Code postal / Ville du bien à assurer
        //- v-row
            v-col.py-1(cols="12")
                input-autocomplete(
                    :rules="[v => !!v || 'Veuillez choisir un code postal / une ville']"
                    v-model="stepsData.subscriber.cityProperty"
                    prepend-icon="mdi-mailbox-open-up"
                    :api="{url: '/api/base/communes/search'}"
                    label="Code postal / Ville"
                    @change="makeCommonAddress(displayers.commonAddress)"
                )

</template>

<script>
import InputText from '../../components/Inputs/InputText';
import InputSelect from '../../components/Inputs/InputSelect';
import InputAutocomplete from '../../components/Inputs/InputAutocomplete';
import InputDate from '../../components/Inputs/InputDate';
import InputRadioList from '../../components/Inputs/InputRadioList';

export default {
    name: 'SubscriberStep',
    data() {
        return {
            isStepValid: false,
        }
    },
    watch: {
        isStepValid() {
            this.$emit('validation', {step: 1, valid: this.isStepValid});
        }
    },
    components: {
        InputText,
        InputSelect,
        InputAutocomplete,
        InputDate,
        InputRadioList,
    },
    props: {
        stepsData: {
            type: Object,
            required: true
        },
    },
    mounted() {
    }
}
</script>

<style>

</style>