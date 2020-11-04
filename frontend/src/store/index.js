import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
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
				addtionalAddress: null,
				city: null,
				birthDate: null,
				hasPropertySameAddress: true,
				cityProperty: null,
			},
			property: {
				context: null,
				quality: 'owner',
				typeProperty: 'house',
				floor: null,
				yearBuilding: null,
				destinationProperty: 'main',
				numberMainRooms: null,
			},
			additional: {
				isBuildedWithHeavyMaterials: false,
				isCoveredWithHeavyMaterials: false,
				hasWoodenSkeleton: false,
				hasSwimmingPool: false,
				hasVeranda: false,
				hasSolarPannels: false,
				hasClosedFireplace: false,
				hasOpenedFireplace: false,
				isOnUnbuildableLand: false,
				isHistoricalMonument: false,
				hasPartiallyProUse: false,
				isCastleType: false,
				isInsulated: false,
				hasAlreadyTerminatedContract: false,
				hasNoDisaster: false,
			},
			estimate: {},
		},
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
	},
	getters: {
		getStep: (state) => (step) => state.stepsData[step],
		getMaxStepNumber: state => state.maxStepNumber,
		getMinStepNumber: state => state.minStepNumber,
		getCurrentStepNumber: state => state.currentStepNumber,
		getCurrentStepName: state => state.currentStepName,
	},
	actions: {},
	modules: {}
})
