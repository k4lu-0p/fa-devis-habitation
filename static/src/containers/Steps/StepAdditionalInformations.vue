<template lang="pug">
    v-form(
        v-if="renderForm"
        lazy-validation 
        v-on:submit.prevent
    )
        //- Si réponse non autorisée
        alert(
            :is-active="isAlertActive"
            @close="handleCloseAlert"
        )

        v-card-text.py-0
            section(v-for="(section, name, index) in $const.fields.additional")
                template(v-if="additionalStepSectionsShowed[name] === true")
                    v-divider.my-6(v-if="index !== 0")
                    h1.font-weight-medium  {{ section.title }}
                    template(v-for="(question, questionIndex) in section.questions")
                        //- Main question
                        v-row
                            v-col.pb-1.pt-2(:cols="$vuetify.breakpoint.xs ? 12 : 9")
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

                            v-col.py-1(:cols="$vuetify.breakpoint.xs ? 12 : 3")
                                //-  Les computeds sont utilisées dynamiquements grace à _self
                                component(
                                    :is="`input-${question.type}`"
                                    v-model.lazy="_self[questionIndex]"
                                    required
                                    :placeholder="question.placeholder"
                                    :items="question.choices"
                                    row
                                )
                        
                        //- Childrens questions
                        template(v-if="question.childrens && Object.keys(question.childrens).length")
                            v-row(v-for="(child, childIndex) in question.childrens")
                                template(v-if="childrenQuestionsVisible[childIndex]")
                                    v-col.pb-1.pt-2(:cols="$vuetify.breakpoint.xs ? 12 : 9")
                                        div.d-flex.flex-row.align-center(style="height: 100%;")
                                            v-icon mdi-chevron-right
                                            p.mb-0.font-weight-medium {{ child.label }}
                                    v-col.py-1(:cols="$vuetify.breakpoint.xs ? 12 : 3")
                                        component(
                                            v-if="child.type !== 'number'"
                                            :is="`input-${child.type}`"
                                            v-model.lazy="_self[childIndex]"
                                            required
                                            :placeholder="child.placeholder"
                                            :items="child.choices"
                                            row
                                        )
                                        //- modification du v-model différent pour les input de type nombre
                                        component(
                                            v-else
                                            :is="`input-${child.type}`"
                                            v-model.number="_self[childIndex]"
                                            required
                                            :max="999"
                                            :min="1"
                                            num-type="simple"
                                            :placeholder="child.placeholder"
                                            row
                                        )
        //- Google Captcha
        v-row
            v-col.d-flex.justify-center.py-10(cols="12")
                captcha(
                    @verify="handleVerifyTokenCaptcha($event)"
                    @expired="handleExpiredTokenCaptcha"
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
                ) mdi-arrow-right
</template>

<script>
import Captcha from '../../components/Captcha';
import Alert from '../../components/Alert';

import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import displayChildrenQuestions from '../../mixins/additional/displayChildrenQuestions'; // Gestion de l'affichage conditionnel des questions enfants
import unauthorizedResponses from '../../mixins/additional/unauthorizedResponses'; // Gestion des réponses non autorisé avec affichage d'un message
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required, numeric, minValue, requiredIf } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate
import { mapGetters } from 'vuex';

export default {
    mixins: [
        displayChildrenQuestions,
        unauthorizedResponses,
    ],
    components: {
        Alert,
        Captcha,
    },
    name: 'AdditionalInformationsStep',
    data() {
        return {
            stepName: 'informations',
            stepNumber: 3,
            isStepValid: false,
            isAlertActive: false,
        }
    },
    validations() {
        let rulesEnabled = { 
            tokenCaptcha: {
                checked: value => value !== '',
            },
        }
        let rulesAvailable = {
            equipmentsRules: {
                hasSwimmingPool: { required }, // equipement
                hasVeranda: { required }, // equipement
                hasSolarPannels: { required }, // equipement
                hasClosedFireplace: { required }, // equipement
                hasOpenedFireplace: { required }, // equipement
            },
            outbuildingsRules: {
                isOutbuildingBuildedWithHeavyMaterials: { required }, // dépendance
                isOutbuildingCoveredWithHeavyMaterials: { required }, // dépendance
                hasOutbuildingWoodenSkeleton: { required }, // dépendance
            },
            mainBuildingRules: {
                isBuildedWithHeavyMaterials: { required }, // batiment principal
                isCoveredWithHeavyMaterials: { required }, // batiment principal
                hasWoodenSkeleton: { required }, // batiment principal
            },
            specifitiesRules: {
                isOnUnbuildableLand: { required }, // spécifités
                isHistoricalMonument: { required }, // spécifités
                hasPartiallyProUse: { required }, // spécifités
                isCastleType: { required }, // spécifités
                isInsulated: { required }, // spécifités
            },
            antecedentsRules: {
                hasAlreadyTerminatedContract: { required }, // antécédents
                hasNoDisaster: { required }, // antécédents
            },
        }

        // Ajoute les règles de validation des sections dynamiquement,
        // si celles-ci sont déclarées comme affichées dans le store.
        // (En fonction des réponse de l'étape précédente)
        Object.keys(this.additionalStepSectionsShowed).forEach(key => {
            if (this.additionalStepSectionsShowed[key] === true) {
                rulesEnabled = {
                    ...rulesEnabled,
                    ...rulesAvailable[`${key}Rules`],
                }
            }
        });
        
        // Constantes
        const { equipments, antecedents } = this.$const.fields.additional;

        // Si on coche OUI pour la PISCINE, les champs enfants deviennent obligatoires
        if (this.hasSwimmingPool === equipments.questions.hasSwimmingPool.choices[0]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                isAbovegroundSwimmingPool: { required }, // equipement // child of hasSwimmingPool
                isCoveredSwimmingPool: { required }, // equipement // child of hasSwimmingPool
            }
        }

        // Si on coche OUI pour la VERANDA, les champs enfants deviennent obligatoires
        if (this.hasVeranda === equipments.questions.hasVeranda.choices[0]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                verandaSurface: {
                    required,
                    numeric,
                    minValue: minValue(1),
                }, // equipement // child of hasVeranda
            }
        }

        // Si on coche OUI pour les PANNEAUX SOLAIRES, les champs enfants deviennent obligatoires
        if (this.hasSolarPannels === equipments.questions.hasSolarPannels.choices[0]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                solarPannelsSurface: { required }, // equipement // child of hasSolarPannels
            }
        }

        // Si on coche OUI pour les POELE A BOIS FOYER FERMÉ, les champs enfants deviennent obligatoires
        if (this.hasClosedFireplace === equipments.questions.hasClosedFireplace.choices[0]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                hasBillingClosedFireplace: { required }, // equipement // child of hasClosedFireplace
            }
        }

        // Si on coche OUI pour les POELE A BOIS FOYER OUVERT, les champs enfants deviennent obligatoires
        if (this.hasOpenedFireplace === equipments.questions.hasOpenedFireplace.choices[0]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                hasBillingOpenedFireplace: { required }, // equipement // child of hasOpenedFireplace
            }
        }

        // Si on coche NON pour les SINISTRES, les champs enfants deviennent obligatoires
        if (this.hasNoDisaster === antecedents.questions.hasNoDisaster.choices[1]['value']) {
            rulesEnabled = {
                ...rulesEnabled,
                nbDisastersWater: { required }, // antécédents // child of hasNoDisaster
                nbDisastersCivil: { required }, // antécédents // child of hasNoDisaster
                nbDisastersSteal: { required }, // antécédents // child of hasNoDisaster
                nbDisastersOther: { required }, // antécédents // child of hasNoDisaster
                nbDisastersClimatic: { required }, // antécédents // child of hasNoDisaster
            }
        }

        return rulesEnabled;
    },
    methods: {
        next() { this.$emit('next') },
        previous() { this.$emit('previous') },
        handleVerifyTokenCaptcha(token) { this.tokenCaptcha = token; },
        handleExpiredTokenCaptcha() { this.tokenCaptcha = ''; }
    },
    computed: {
        ...mapStepFieldsToStore([
            'isBuildedWithHeavyMaterials', // batiment principal
            'isCoveredWithHeavyMaterials', // batiment principal
            'hasWoodenSkeleton', // batiment principal
            'isOutbuildingBuildedWithHeavyMaterials', // dependances
            'isOutbuildingCoveredWithHeavyMaterials', // dependances
            'hasOutbuildingWoodenSkeleton', // dependances
            'hasSwimmingPool', // equipement
            'isAbovegroundSwimmingPool', // equipement // child of hasSwimmingPool
            'isCoveredSwimmingPool', // equipement // child of hasSwimmingPool
            'hasVeranda', // equipement
            'verandaSurface', // equipement // child of hasVeranda
            'hasSolarPannels', // equipement
            'solarPannelsSurface', // equipement // child of hasSolarPannels
            'hasClosedFireplace', // equipement
            'hasOpenedFireplace', // equipement
            'hasBillingClosedFireplace', // equipement // child of hasClosedFireplace
            'hasBillingOpenedFireplace', // equipement // child of hasOpenedFireplace
            'isOnUnbuildableLand', // spécificité
            'isHistoricalMonument', // spécificité
            'hasPartiallyProUse', // spécificité
            'isCastleType', // spécificité
            'isInsulated', // spécificité
            'hasAlreadyTerminatedContract', // antécédent
            // 'hasNoDisaster', // antécédent // cas particulier
            'nbDisastersWater', // antécédent
            'nbDisastersCivil', // antécédent
            'nbDisastersSteal', // antécédent
            'nbDisastersOther', // antécédent
            'nbDisastersClimatic', // antécédent
        ], 'additional'),
        // on affiche la section dépendances si la surface dépasse 0 
        // défini dans l'étape prédédente
        ...mapStepFieldsToStore([ 'areaOutbuildings', 'quality' ], 'property'),

        // Certaines sections sont affichées/cachées en fonction des réponses de l'étape précédente
        ...mapGetters({
            additionalStepSectionsShowed: 'getAdditionalStepSectionsShowed',
        }),
        hasNoDisaster: {
            get() {
                return this.$store.getters['getStep']('additional')['hasNoDisaster'];
            },
            set(value) {
                let stepData = { hasNoDisaster: value };
                // Si je repasse de Propriétaire (ayant défini une date de construction) vers Locataire 
                if (value === this.$const.fields.additional.antecedents.questions.hasNoDisaster.choices[0]['value']) {
                    stepData = { 
                        ...stepData,
                        nbDisastersWater: null,
                        nbDisastersCivil: null,
                        nbDisastersSteal: null,
                        nbDisastersOther: null,
                        nbDisastersClimatic: null,
                    };
                }
                this.$store.commit('UPDATE_STEP_DATA', { stepName: 'additional', stepData, });
            },
        },
        tokenCaptcha: {
            get() { return this.$store.getters['getTokenCaptcha']},
            set(value) { this.$store.commit('UPDATE_TOKEN_CAPTCHA', value) }
        }
    },
}
</script>

<style>

</style>