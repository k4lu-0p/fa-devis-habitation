import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: false,
		status: 'new_form',
		maxStepNumber: 4,
		minStepNumber: 1,
		currentStepNumber: 1,
		currentStepName: '',
		stepsData: {
			subscriber: {
				firstname: null,
				lastname: null,
				civility: null,
				familySituation: null,
				address: null,
				additionalAddress: null,
				city: null,
				birthDate: null,
				hasPropertySameAddress: true,
				job: null,
				email: null,
				phone: null,
			},
			property: {
				addressProperty: null,
				additionalPropertyAddress: null,
				cityProperty: null,
				context: null,
				quality: 'owner',
				typeProperty: 'house',
				floor: null,
				yearBuilding: null,
				destinationProperty: 'main',
				numberMainRooms: null,
				areaOutbuildings: 0,
				movableCapitalToBeGuaranteed: null,
				objectValuableCapital: null,
			},
			additional: {
				isBuildedWithHeavyMaterials: null, // batiment principal
				isCoveredWithHeavyMaterials: null, // batiment principal
				hasWoodenSkeleton: null, // batiment principal
				isOutbuildingBuildedWithHeavyMaterials: null, // dependances
				isOutbuildingCoveredWithHeavyMaterials: null, // dependances
				hasOutbuildingWoodenSkeleton: null, // dependances
				hasSwimmingPool: null, // equipement
				isAbovegroundSwimmingPool: null, // equipement
				isCoveredSwimmingPool: null, // equipement
				hasVeranda: null, // equipement
				verandaSurface: 0, // equipement
				hasSolarPannels: null, // equipement
				solarPannelsSurface: 0, // equipement
				hasClosedFireplace: null, // equipement
				hasOpenedFireplace: null, // equipement
				hasBillingClosedFireplace: null, // equipement
				hasBillingOpenedFireplace: null, // equipement
				isOnUnbuildableLand: null, // spécificités
				isHistoricalMonument: null, // spécificités
				hasPartiallyProUse: null, // spécificités
				isCastleType: null, // spécificités
				isInsulated: null, // spécificités
				hasAlreadyTerminatedContract: null, // antécédents
				hasNoDisaster: null, // antécédents
				nbDisastersWater: null, // antécédents
				nbDisastersCivil: null, // antécédents
				nbDisastersSteal: null, // antécédents
				nbDisastersOther: null, // antécédents
				nbDisastersClimatic: null, // antécédents
			},
			commercialCode: null,
		},
		responseApiData: {},
		/** 
		 * Certaines sections de l'étape "Informations complémentaires" (additional step)
		 * sont affichées/cachées en fonction des réponses de l'étape "Descriptif du bien".
		 */  
		additionalStepSectionsShowed: {
			mainBuilding: true, 
			outbuildings: false,
			equipments: true,
			specifities: true,
			antecedents: true,
		},
		fieldsProvidedByAPI: [],
		tooltipsProvidedByAPI: [],
		formResult: null,
		formulaNameSelected: '',
		blobImg: null,
		tokenCaptcha: '',
		isConfirmScreenVisible: false,
	},
	mutations: {
		UPDATE_VISIBILITY_CONFIRM_SCREEN(state, bool) {
			state.isConfirmScreenVisible = bool;
		},
		UPDATE_LOADING(state, isLoading) {
			state.loading = isLoading;
		},
		UPDATE_STEP_DATA(state, payload) {
			state.stepsData[payload.stepName] = {
				...state.stepsData[payload.stepName],
				...payload.stepData,
			}
		},
		UPDATE_CURRENT_STEP_NUMBER(state, currentStepNumber) {
			state.currentStepNumber = currentStepNumber;
		},
		UPDATE_CURRENT_STEP_NAME(state, currentStepName) {
			state.currentStepName = currentStepName;
		},
		UPDATE_ADDITIONAL_STEP_SECTION_SHOWED(state, additionalStepSectionsShowed) {
			state.additionalStepSectionsShowed = {
				...state.additionalStepSectionsShowed,
				...additionalStepSectionsShowed,
			}
		},
		UPDATE_FIELDS_PROVIDED_BY_API(state, fieldsProvidedByAPI) {
			state.fieldsProvidedByAPI = fieldsProvidedByAPI;
		},
		UPDATE_TOOLTIPS_PROVIDED_BY_API(state, tooltipsProvidedByAPI) {
			state.tooltipsProvidedByAPI = tooltipsProvidedByAPI;
		},
		UPDATE_FORM_RESULT(state, formResult) {
			state.formResult = formResult;
		},
		UPDATE_FORMULA_NAME_SELECTED(state, formulaNameSelected) {
			state.formulaNameSelected = formulaNameSelected;
		},
		UPDATE_BLOB_IMG(state, blobImg) {
			state.blobImg = blobImg;
		},
		UPDATE_COMMERCIAL_CODE(state, commercialCode) {
			state.stepsData.commercialCode = commercialCode;
		},
		UPDATE_TOKEN_CAPTCHA(state, tokenCaptcha) {
			state.tokenCaptcha = tokenCaptcha;
		}
	},
	getters: {
		getConfirmScreenVisible: (state) => state.isConfirmScreenVisible,
		getLoading: (state) => state.loading,
		getStep: (state) => (step) => state.stepsData[step],
		getMaxStepNumber: state => state.maxStepNumber,
		getMinStepNumber: state => state.minStepNumber,
		getCurrentStepNumber: state => state.currentStepNumber,
		getCurrentStepName: state => state.currentStepName,
		getResponseApiData: state => state.responseApiData,
		hasApiAnswer: state => Object.keys(state.responseApiData).length,
		getAdditionalStepSectionsShowed: state => state.additionalStepSectionsShowed,
		// Dynamic fields
		getNumberMainRoomsChoices: (state) => {
			return state.fieldsProvidedByAPI.map((item) => {
				return {
					text: item.text,
					value: item.value,
				}
			})
		},
		getMovableCapitalToBeGuaranteedChoices: (state) => {
			let movableCapitalToBeGuaranteedChoices = [];
			if (state.stepsData.property.numberMainRooms) {
				// Les choix disponible pour ce champ, dépendent du choix effectué sur le nombre de pièces principales
				movableCapitalToBeGuaranteedChoices = state.fieldsProvidedByAPI.find((item) => {
					return item.value === state.stepsData.property.numberMainRooms
				})['movableCapitalToBeGuaranteed']

				// Ensuite on map le choix pour être compatible avec le select de Vuetify
				movableCapitalToBeGuaranteedChoices = movableCapitalToBeGuaranteedChoices.map((item) => {
					return {
						text: item,
						value: item,
					}
				})
			}
			return movableCapitalToBeGuaranteedChoices;
		},
		getFormResult: (state) => state.formResult,
		getBlobImg: (state) => state.blobImg,
		getCommercialCode: (state) => state.stepsData.commercialCode,
		getTokenCaptcha: (state) => state.tokenCaptcha,
		getTooltips: (state) => state.tooltipsProvidedByAPI,
		getTooltip: (state) => (code) => state.tooltipsProvidedByAPI.find(tooltip => tooltip['sCodeBulle'] === code),
	},
	actions: {
		async fetchFieldsProvidedByAPI({ commit }) {
			let baseURL = '';
			if (process.env.NODE_ENV === 'development') {
				baseURL = 'http://localhost:3333';
			}
			let url = `${baseURL}${process.env.VUE_APP_MEDIALOG_ROUTE_SWP_RETOURNE_NB_PIECES_CONTENU}`;

			commit('UPDATE_LOADING', true);

			try {
				const { data: fieldsProvidedByAPI } = await axios.get(url);
				commit('UPDATE_FIELDS_PROVIDED_BY_API', fieldsProvidedByAPI);
			} catch (error) {
				console.error(error);
			}

			commit('UPDATE_LOADING', false);
		},
		async fetchTooltipsProvidedByAPI({ commit }) {
			let baseURL = '';
			if (process.env.NODE_ENV === 'development') {
				baseURL = 'http://localhost:3333';
			}
			let url = `${baseURL}${process.env.VUE_APP_MEDIALOG_ROUTE_SWP_RETOURNE_LISTE_BULLE_AIDE}`;

			commit('UPDATE_LOADING', true);

			try {
				const { data: tooltipsProvidedByAPI } = await axios.get(url);
				commit('UPDATE_TOOLTIPS_PROVIDED_BY_API', tooltipsProvidedByAPI);
			} catch (error) {
				console.error(error);
			}

			commit('UPDATE_LOADING', false);
		},
		async fetchFormulasWithStepsData({ commit, state }, bypassCaptcha) {
			let baseURL = '';
			if (process.env.NODE_ENV === 'development') {
				baseURL = 'http://localhost:3333';
			}

			const url = `${baseURL}${process.env.VUE_APP_MEDIALOG_ROUTE_SWP_RETOURNE_TARIF}`;
			
			const body = {
				formData: state.stepsData,
				tokenCaptcha: state.tokenCaptcha,
				bypassCaptcha,
			};
			
			commit('UPDATE_LOADING', true);

			try {
				const { data: tableauTarification } = await axios.post(url, body);
				commit('UPDATE_FORM_RESULT', tableauTarification);
				// si le client est déjà rattaché à un courtier, on affiche pas les prix et on passe directement à l'écran final
				if (tableauTarification['nTypeClientDetecte'] != 1) {
					commit('UPDATE_VISIBILITY_CONFIRM_SCREEN', true);
				}
			} catch(error) {
				console.error(error);
			}

			commit('UPDATE_LOADING', false);
		},
		async fetchPdfFile({ commit, state }) {
			let baseURL = '';
			if (process.env.NODE_ENV === 'development') {
				baseURL = 'http://localhost:3333';
			}

			const url = `${baseURL}${process.env.VUE_APP_MEDIALOG_ROUTE_SWP_RETOURNE_TARIF_PDF}`;

			commit('UPDATE_LOADING', true);
			
			const body = {
				formData: state.stepsData,
				formulaNameSelected: state.formulaNameSelected,
			};

			const { data: { devisPDF } } = await axios.post(url, body);

			if (devisPDF && devisPDF.sContenuFichierBase64) {
				const byteCharacters = atob(devisPDF.sContenuFichierBase64);
				const byteNumbers = new Array(byteCharacters.length);

				for (let i = 0; i < byteCharacters.length; i++) {
						byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const file = new Blob([byteArray], { type: 'application/pdf;base64' });
				const fileURL = URL.createObjectURL(file);
				const blobImg = fileURL;

				commit('UPDATE_BLOB_IMG', blobImg);
				commit('UPDATE_LOADING', false);
			}
		}
	},
	modules: {}
})
