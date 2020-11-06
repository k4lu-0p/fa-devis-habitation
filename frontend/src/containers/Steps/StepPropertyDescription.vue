<template lang="pug">
    v-form(
        lazy-validation 
        v-on:submit.prevent
    )
        v-card-text.py-0
            //- Contexte de la demande de devis
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.context.label }}
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="context"
                        :error-messages="contextErrors"
                        @input="$v.context.$touch()"
                        @blur="$v.context.$touch()"
                        :items="$const.fields.property.context.choices"
                        :prepend-icon="$const.fields.property.context.icon"
                        label="Choisir dans la liste ci-dessous"
                    )
            //- Qualité de l'assuré
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.quality.label }}
                v-col.py-1(cols="7")
                    input-radio-list(
                        v-model.lazy="quality"
                        :error-messages="qualityErrors"
                        @input="$v.quality.$touch()"
                        @blur="$v.quality.$touch()"
                        :items="$const.fields.property.quality.choices"
                        row
                    )
            //- Nature du bien
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.typeProperty.label }}
                v-col.py-1(cols="7")
                    input-radio-list(
                        v-model.lazy="typeProperty"
                        :error-messages="typePropertyErrors"
                        @input="$v.typeProperty.$touch()"
                        @blur="$v.typeProperty.$touch()"
                        :items="$const.fields.property.typeProperty.choices"
                        row
                    )
            //- Étage
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.floor.label }}
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="floor"
                        :error-messages="floorErrors"
                        @input="$v.floor.$touch()"
                        @blur="$v.floor.$touch()"
                        :items="$const.fields.property.floor.choices"
                        :prepend-icon="$const.fields.property.floor.icon"
                        label="Choisir dans la liste ci-dessous"
                    )
            //- Année de construction
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.yearBuilding.label }}
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="yearBuilding"
                        :error-messages="yearBuildingErrors"
                        @input="$v.yearBuilding.$touch()"
                        @blur="$v.yearBuilding.$touch()"
                        :items="$const.fields.property.yearBuilding.choices"
                        :prepend-icon="$const.fields.property.yearBuilding.icon"
                        label="Choisir dans la liste ci-dessous"
                    )

            //- Destination du bien (avec Tooltip)
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        v-tooltip(right)
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ $const.fields.property.destinationProperty.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span Information complémentaire pour le champ
                v-col.py-1(cols="7")
                    input-radio-list(
                        v-model.lazy="destinationProperty"
                        :error-messages="destinationPropertyErrors"
                        @input="$v.destinationProperty.$touch()"
                        @blur="$v.destinationProperty.$touch()"
                        :items="$const.fields.property.destinationProperty.choices"
                        row
                    )

            //- Nombre de pièces principales
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        v-tooltip(right)
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ $const.fields.property.numberMainRooms.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span Information complémentaire pour le champ
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="numberMainRooms"
                        :error-messages="numberMainRoomsErrors"
                        @input="$v.numberMainRooms.$touch()"
                        @blur="$v.numberMainRooms.$touch()"
                        :items="$const.fields.property.numberMainRooms.choices"
                        :prepend-icon="$const.fields.property.numberMainRooms.icon"
                        label="Choisir dans la liste ci-dessous"
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
                :disabled="$v.$invalid"
            )
                span Suivant
                v-icon(
                    right
                    v-text="!$v.$invalid ? 'mdi-arrow-right' : 'mdi-lock-outline'"
                )
</template>

<script>
import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required } from 'vuelidate/lib/validators';

export default {
    mixins: [
        errorsMixin,
        validationMixin,
    ],
	name: 'PropertyDescriptionStep',
    data() {
        return {
            stepName: 'property',
            stepNumber: 2,
            isStepValid: false,
        }
    },
    validations: {
        context: { required },
        quality: { required },
        typeProperty: { required },
        floor: { required },
        yearBuilding: { required },
        destinationProperty: { required },
        numberMainRooms: { required },
    },
    computed: {
        ...mapStepFieldsToStore([
            'context',
            'quality',
            'typeProperty',
            'floor',
            'yearBuilding',
            'destinationProperty',
            'numberMainRooms',
        ], 'property')
    },
    methods: {
        next() { this.$emit('next') },
        previous() { this.$emit('previous') }
    },
}
</script>

<style>

</style>