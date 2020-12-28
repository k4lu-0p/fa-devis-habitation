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
            v-row(v-if="typeProperty === $const.fields.property.typeProperty.choices[1]['value']")
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
            v-row(v-if="quality === $const.fields.property.quality.choices[0]['value']")
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
                        v-tooltip(right max-width="300")
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ $const.fields.property.destinationProperty.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span(v-html="getTooltip($const.fields.property.destinationProperty.tooltipCode)")
                v-col.py-1(cols="7")
                    input-radio-list(
                        v-model.lazy="destinationProperty"
                        :error-messages="destinationPropertyErrors"
                        @input="$v.destinationProperty.$touch()"
                        @blur="$v.destinationProperty.$touch()"
                        :items="$const.fields.property.destinationProperty.choices"
                        row
                    )

            //- Nombre de pièces principales (avec tooltip)
            //- FOURNI PAR API
            v-row
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        v-tooltip(right max-width="300")
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ $const.fields.property.numberMainRooms.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span(v-html="getTooltip($const.fields.property.numberMainRooms.tooltipCode)")

                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="numberMainRooms"
                        :error-messages="numberMainRoomsErrors"
                        @input="$v.numberMainRooms.$touch()"
                        @blur="$v.numberMainRooms.$touch()"
                        :items="numberMainRoomsChoices"
                        :prepend-icon="$const.fields.property.numberMainRooms.icon"
                        label="Choisir dans la liste ci-dessous"
                    )
            
            //- Surface réelle des dépendances
            v-row(v-if="numberMainRooms")
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        v-tooltip(right)
                            template(v-slot:activator="{ on, attrs }")
                                div.d-flex(v-bind="attrs" v-on="on")
                                    span.mb-0.font-weight-medium {{ $const.fields.property.areaOutbuildings.label }}
                                    v-icon.pl-2 mdi-help-circle
                            span Information complémentaire pour le champ
                v-col.py-1(cols="7")
                    input-number(
                        v-model.lazy="areaOutbuildings"
                        :max="999999"
                        :min="0"
                        numType="integer"
                        :prepend-icon="$const.fields.property.areaOutbuildings.icon"
                        :label="$const.fields.property.areaOutbuildings.label"
                        :error-messages="areaOutbuildingsErrors"
                        @input="$v.areaOutbuildings.$touch()"
                        @blur="$v.areaOutbuildings.$touch()"
                    )

            //- Capital mobilier à garantir
            //- FOURNI PAR API
            v-row(v-if="numberMainRooms")
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.movableCapitalToBeGuaranteed.label }}
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="movableCapitalToBeGuaranteed"
                        :error-messages="movableCapitalToBeGuaranteedErrors"
                        @input="$v.movableCapitalToBeGuaranteed.$touch()"
                        @blur="$v.movableCapitalToBeGuaranteed.$touch()"
                        :items="movableCapitalToBeGuaranteedChoices"
                        :prepend-icon="$const.fields.property.movableCapitalToBeGuaranteed.icon"
                        label="Choisir dans la liste ci-dessous"
                    )
            
            //- Dont capital objets de valeur à garantir
            v-row(v-if="movableCapitalToBeGuaranteed")
                v-col.pb-1.pt-2(cols="5")
                    div.d-flex.flex-row.align-center(style="height: 100%;")
                        p.mb-0.font-weight-medium {{ $const.fields.property.objectValuableCapital.label }}
                v-col.py-1(cols="7")
                    input-select(
                        v-model.lazy="objectValuableCapital"
                        :error-messages="objectValuableCapitalErrors"
                        @input="$v.objectValuableCapital.$touch()"
                        @blur="$v.objectValuableCapital.$touch()"
                        :items="$const.fields.property.objectValuableCapital.choices"
                        :prepend-icon="$const.fields.property.objectValuableCapital.icon"
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
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required, numeric } from 'vuelidate/lib/validators';

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
    validations() {
        let rules = {
            context: { required },
            quality: { required },
            typeProperty: { required },
            destinationProperty: { required },
            numberMainRooms: { required },
            areaOutbuildings: { required, numeric },
            movableCapitalToBeGuaranteed: { required },
            objectValuableCapital: { required },
        }
        // Si l'assuré est propriétaire le champ Année de construction devient obligatoire
        if (this.quality === this.$const.fields.property.quality.choices[0]['value']) {
            rules = { ...rules, yearBuilding: { required }, }
        }
        // Si la nature du bien est un appartement le champ Étage devient obligatoire
        if (this.typeProperty === this.$const.fields.property.typeProperty.choices[1]['value']) {
            rules = { ...rules, floor: { required }, }
        }

        return rules;
    },
    computed: {
        ...mapGetters({
            numberMainRoomsChoices: 'getNumberMainRoomsChoices',
            movableCapitalToBeGuaranteedChoices: 'getMovableCapitalToBeGuaranteedChoices',
        }),
        ...mapStepFieldsToStore([
            'context',
            // 'quality', // cas particulier
            // 'typeProperty', // cas particulier
            // 'areaOutbuildings', // cas particulier
            'movableCapitalToBeGuaranteed',
            'objectValuableCapital',
            'floor',
            'yearBuilding',
            'destinationProperty',
            // 'numberMainRooms', // cas particulier
        ], 'property'),
        quality: {
            get() {
                return this.$store.getters['getStep']('property')['quality'];
            },
            set(value) {
                let stepData = { quality: value };
                /**
                 * Si je change de réponse soit de Propriétaire (ayant défini une date de construction) vers Locataire,
                 * alors je réinitialise le champ Année de construction
                 */  
                stepData = { ...stepData, yearBuilding: null };

                // Cache / Affiche les sections de l'étape suivante en fonction de la réponse
                this.$store.commit('UPDATE_ADDITIONAL_STEP_SECTION_SHOWED', {
                    mainBuilding: true, 
                    equipments: true,
                });
                if (value === this.$const.fields.property.quality.choices[1]['value']) {
                    this.$store.commit('UPDATE_ADDITIONAL_STEP_SECTION_SHOWED', {
                        mainBuilding: false, 
                        outbuildings: false,
                        equipments: false,
                    });
                }

                this.$store.commit('UPDATE_STEP_DATA', { stepName: 'property', stepData, });
            },
        },
        typeProperty: {
            get() {
                return this.$store.getters['getStep']('property')['typeProperty'];
            },
            set(value) {
                let stepData = { typeProperty: value };
                // Si je repasse de Propriétaire (ayant défini une date de construction) vers Locataire 
                if (value === this.$const.fields.property.typeProperty.choices[0]['value']) {
                    stepData = { ...stepData, floor: null };
                }
                this.$store.commit('UPDATE_STEP_DATA', { stepName: 'property', stepData, });
            },
        },
        areaOutbuildings: {
            get() {
                return this.$store.getters['getStep']('property')['areaOutbuildings'];
            },
            set(value) {
                let stepData = { areaOutbuildings: value };

                /** Affiche ou montre la section Dépendance de l'étape suivante en fonction 
                 * de la surface définie et la qualité de l'assuré dans l'étape courante.
                 */
                this.$store.commit('UPDATE_ADDITIONAL_STEP_SECTION_SHOWED', { outbuildings: false })
                if (Number(value) > 0 && this.quality === this.$const.fields.property.quality.choices[0]['value']) {
                    this.$store.commit('UPDATE_ADDITIONAL_STEP_SECTION_SHOWED', { outbuildings: true })
                }

                this.$store.commit('UPDATE_STEP_DATA', { stepName: 'property', stepData, });
            }
        },
        numberMainRooms: {
            get() {
                return this.$store.getters['getStep']('property')['numberMainRooms'];
            },
            set(value) {
                let stepData = { 
                    numberMainRooms: value,
                    // Réinitialise le champ Capital Mobilier à garantir si celui-ci change
                    movableCapitalToBeGuaranteed: null,
                };

                this.$store.commit('UPDATE_STEP_DATA', { stepName: 'property', stepData, });
            }
        },
    },
    methods: {
        next() { this.$emit('next') },
        previous() { this.$emit('previous') },
        getTooltip(code) {
            let tooltipObject = this.$store.getters['getTooltip'](code);
            return atob(tooltipObject['sCorpsTexteHTMLBase64']);
        }
    },
}
</script>

<style>

</style>