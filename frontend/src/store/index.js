import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		maxStepNumber: 4,
		minStepNumber: 1,
		currentStepNumber: 2,
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
			estimate: {
				commercialCode: null,
				desiredGuarantee: 'tiers',
			},
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
	},
	mutations: {
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
		}
	},
	getters: {
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
		// Les choix disponible pour ce champ, dépendent du choix effectué sur le nombre de pièces principales
		getMovableCapitalToBeGuaranteedChoices: (state) => {
			let choices = [];
			if (state.stepsData.property.numberMainRooms) {
				choices = state.fieldsProvidedByAPI.find((item) => {
					return item.value === state.stepsData.property.numberMainRooms
				})['movableCapitalToBeGuaranteed']

				choices = choices.map((item) => {
					return {
						text: item,
						value: item,
					}
				})
			}
			return choices;
		}
	},
	actions: {
		async fetchFieldsProvidedByAPI({ commit }) {
			let baseURL = '';
			if (process.env.NODE_ENV === 'development') {
				baseURL = 'http://localhost:3333';
			}
			let url = `${baseURL}/api/devis/habitation/champs-dynamiques`;
			const { data: fieldsProvidedByAPI } = await axios.get(url);
			commit('UPDATE_FIELDS_PROVIDED_BY_API', fieldsProvidedByAPI);
		}
	},
	modules: {}
})
