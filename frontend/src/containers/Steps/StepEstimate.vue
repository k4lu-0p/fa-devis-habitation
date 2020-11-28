<template lang="pug">
    v-form(
        lazy-validation 
        v-on:submit.prevent
    )   

        //- TEMP
        //- v-btn(
        //-     color="gray darken-3"
        //-     @click="previous"
        //-     depressed
        //- )
        //-     v-icon(left) mdi-arrow-left
        //-     span Précédent

        template(
            v-if="formResult && !isConfirmScreenVisible && !blobImg"
        )
            v-card-text.py-0(v-if="Number(formResult.codeInfo) === 0")
                v-row
                    v-col.py-1(cols="12")
                        h2 Votre simulation

                //- Code commercial
                v-row
                    v-col.py-1(cols="12")
                        input-text(
                            v-model.lazy.trim="commercialCode"
                            @change="handleChangeCommercialCode($event)"
                            required
                            :prepend-icon="$const.fields.estimate.commercialCode.icon"
                            :label="$const.fields.estimate.commercialCode.label"
                            format="uppercase"
                        )

                //- Garanties souhaitées
                //- v-row
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
                
                //- v-divider

            //- Mes formules
            template(
                v-if="Number(formResult.codeInfo) === 0"
            )
                v-row.px-1.py-10
                    template(v-for="formule in mesFormules")
                        v-col.d-flex.justify-center(:cols="mesFormules.length / 12")
                            v-card.rounded-lg.py-2.px-2(
                                :class="[selectedFormula && formule.nomFormule === selectedFormula.nomFormule ? 'card-active' : '']"
                            )
                                v-card-text
                                    p.mb-0.text--secondary.font-weight-light Ma formule
                                    p.mb-0.display-1.text--primary {{ formule.nomFormule }}

                                    div.d-flex.row.justify-center.align-end.py-4
                                        h1.pr-2.display-2.primary--text.font-weight-bold {{ formule.valeurMensuelleAffiche.split('/')[0] }}€
                                        h3.text--secondary.font-weight-light / mois

                                    div.d-flex
                                        h3.pr-2.text--secondary.font-weight-light Soit
                                        h2.pr-2.primary--text {{ formule.valeurAnnuelleAffiche.split('/')[0] }}€
                                        h3.text--secondary.font-weight-light par an
                                v-card-actions.ml-0.py-4
                                    v-btn(
                                        @click="detailFormula(formule)"
                                        color="primary"
                                    ) Voir le détails
                                    v-btn(
                                        @click="selectFormula(formule)"
                                        color="secondary"
                                        :disabled="selectedFormula && formule.nomFormule === selectedFormula.nomFormule"
                                    ) Choisir
                //- Condition générale
                v-row
                    v-col.d-flex.justify-end(cols="12")
                        small.px-2 {{ formResult.sRenvoiTableauComparatif }}

            //- Aucune formule disponible
            template(v-if="loading === false && Number(formResult.codeInfo) > 0")
                v-row   
                    v-col.d-flex.justify-center.py-10(cols="12")
                        div
                            p.display-1.text-center.secondary--text.font-weight-bold Nous sommes désolé...
                            p.display-1.text-center.secondary--text.font-weight-bold {{ formResult.sLibErreur }}

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
                    depressed
                    @click="cancel"
                )
                    span Annuler

                v-btn(
                    color="secondary"
                    depressed
                    @click="isConfirmScreenVisible = true"
                    :disabled="!selectedFormula"
                )
                    span Recevoir le devis
        
        //- Écran final de confirmation
        template(v-if="!loading && isConfirmScreenVisible")
            type-client-block-message(:nTypeClientDetecte="formResult.nTypeClientDetecte")
                v-card-text.text-center.info--text(v-html="formResult.sCoordonneesCourtier")
            v-card-actions
                v-spacer
                v-btn(
                    color="primary"
                    depressed
                    @click="cancel()"
                )
                    span Annuler
                v-btn(
                    color="secondary"
                    depressed
                    @click="fetchEstimate()"
                )
                    span Recevoir le devis

        //- Visualisation du .pdf
        template(v-if="blobImg && !loading && !isConfirmScreenVisible")
            object(
                :data="blobImg"
                type="application/pdf"
                :style="{width: '100%', height: '80vh', marginBottom: '-7px'}"
            )
            v-row
                v-col.d-flex.justify-end(cols="12")
                    v-btn.mr-2(color="secondary" :href="blobImg" target="_blank") Télécharger
                    v-btn(color="primary" href="https://www.frontassur.com/") Retour au site

        //- Detail modal
        v-dialog(
            :value="isModalVisible"
            max-width="700"
            persistent
        )
            v-card(
                v-if="detailedFormula"
            )
                v-card-title.headline Formule {{ detailedFormula.nomFormule }}
                v-simple-table(
                    fixed-header
                    height="60vh"
                )
                    template(v-slot:default)
                        thead
                            tr
                                th(colspan="2")
                                th.text-center Garanties
                                th.text-center Franchises
                        tbody
                            tr(v-for="tc in tableauComparatif")
                                template(v-if="tc.libelle && tc.nomFormule === detailedFormula.nomFormule")
                                    td.font-weight-medium {{ tc.libelle }}
                                    td
                                    //- td(width="50px") coucou
                                        //- <i class="fa fa-question-circle text-primary"
                                        //-     data-toggle="tooltip"
                                        //-     data-placement="right"
                                        //-     :title="tc.sDescriptifDetaille"
                                        //-     v-if="tc.sDescriptifDetaille"
                                        //- ></i>&nbsp

                                    template(v-if="tc.bOptionsFacultatives === 'true'")
                                        td(colspan="2")
                                            div.modal-final-content.text-center.secondary--text.font-weight-bold Option : {{ parseInt(tc.bMontantOptionFacultative).toFixed(2) }}€ /an
                                    template(v-else)
                                        td.text-center
                                            div.font-weight-bold X&nbsp;
                                        td.text-center
                                            div.primary--text.font-weight-bold {{ tc.sFranchise }}&nbsp;
                        tfoot

                v-card-actions
                    v-spacer
                    v-btn(color="primary" text @click="isModalVisible = false") Fermer
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import mapStepFieldsToStore from '../../utils/mapStepFieldsToStore';
import { validationMixin } from 'vuelidate';
import errorsMixin from '../../mixins/validator/errors'; // Mixins contenant les messages d'erreurs (computed) pour Vuelidate 
import { required } from 'vuelidate/lib/validators'; // Mixins des régles à appliquer sur les champs (methods) pour Vuelidate
import TypeClientBlockMessage from '../../components/TypeClientBlockMessage';

export default {
    name: 'EstimateStep',
    mixins: [ errorsMixin ],
    components: {
        TypeClientBlockMessage,
    },
    data() {
        return {
            selectedFormula: null,
            detailedFormula: null,
            isModalVisible: false,
            isConfirmScreenVisible: false,
        }
    },
    validations: {
        commercialCode: { required },
        desiredGuarantee: { required },
    },
    computed: {
        ...mapGetters({
            formResult: 'getFormResult',
            loading: 'getLoading',
            blobImg: 'getBlobImg',
        }),
        commercialCode: {
            get() { return this.$store.getters['getCommercialCode']},
            set(value) { this.$store.commit('UPDATE_COMMERCIAL_CODE', value) }
        },
        mesFormules () {
            if (this.formResult && this.formResult.mesFormules) {
                return _.orderBy(this.formResult.mesFormules, ['nOrdreAffichage'], ['asc'])
            }
            return []
        },
        listFranchises () {
            let libelle = []
            if (this.formResult) {
                _.forEach(this.formResult.mesFormules, (formule) => {
                    if (_.isArray(formule.mesFranchises)) {
                        _.forEach(_.orderBy(formule.mesFranchises, ['nOrdreAffichage'], ['asc']), (franchise) => {
                            if (!_.isUndefined(franchise.libelle) && !libelle.includes(franchise.libelle)) libelle.push(franchise.libelle)
                        })
                    } else {
                        if (!_.isUndefined(formule.mesFranchises) && !libelle.includes(formule.mesFranchises.libelle)) libelle.push(formule.mesFranchises.libelle)
                    }
                })
            }
            return libelle
        },
        tableauComparatif() {
            if (!_.isEmpty(this.formResult)) {
                let preorder = this.formResult.tableauComparatif

                preorder = _.orderBy(preorder, 'bincluse').reverse()
                preorder = _.orderBy(preorder, 'bOptionsFacultatives')

                return preorder
            }

            return []
        },
    },
    methods: {
        next() { this.$emit('next'); },
        previous() { this.$emit('previous'); },
        cancel() {
            this.isConfirmScreenVisible = false;
            this.selectedFormula = null;
            this.$store.commit('UPDATE_FORMULA_NAME_SELECTED', '');
            this.$emit('previous');
        },
        fetchEstimate() {
            if (this.selectedFormula) {
                this.isConfirmScreenVisible = false;
                this.$store.dispatch('fetchPdfFile');
            }
        },
        selectFormula(formule) {
            this.selectedFormula = formule;
            this.$store.commit('UPDATE_FORMULA_NAME_SELECTED', formule.nomFormule);
        },
        detailFormula(formule) {
            this.detailedFormula = formule;
            this.isModalVisible = true;
        },
        handleChangeCommercialCode(event) {
            if (event) {
                this.$store.dispatch('fetchFormulasWithStepsData')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.card-active {
    h2, h1 {
        color: var(--v-secondary-base) !important;
        transition-property: all;
        transition-duration: .1s;
        transition-timing-function: cubic-bezier(1, -0.01, 1, 0.74);
        transition-delay: 0s;
    }
    -webkit-box-shadow:  0px 0px 0px 3px  var(--v-secondary-base) !important;
    -moz-box-shadow:  0px 0px 0px 3px  var(--v-secondary-base) !important;
    box-shadow:  0px 0px 0px 3px  var(--v-secondary-base) !important;
    transition: all .2s;
}

</style>