import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		maxStepNumber: 4,
		minStepNumber: 1,
		currentStepNumber: 3,
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
		}
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
	},
	actions: {},
	modules: {}
})
