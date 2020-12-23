/*
Cette mixin s'occupe de gérer l'affichage conditionnel des questions enfants.
*/

export default {
	data() {
		return {
			childrenQuestionsVisible: {
				isAbovegroundSwimmingPool: false,
				isCoveredSwimmingPool: false,
				verandaSurface: false,
				solarPannelsSurface: false,
				hasBillingClosedFireplace: false,
				hasBillingOpenedFireplace: false,
				nbDisastersWater: false,
				nbDisastersCivil: false,
				nbDisastersSteal: false,
				nbDisastersOther: false,
				nbDisastersClimatic: false,
			},
		}
	},
	watch: {
        hasSwimmingPool(val) {
            const childrenQuestionsList = ['isAbovegroundSwimmingPool', 'isCoveredSwimmingPool'];
            this.toggleVisibleChildrenQuestions(val, childrenQuestionsList, 'OUI');
		},
        hasVeranda(val) {
            this.toggleVisibleChildrenQuestions(val, ['verandaSurface'], 'OUI');
        },
        hasSolarPannels(val) {
            this.toggleVisibleChildrenQuestions(val, ['solarPannelsSurface'], 'OUI');
        },
        hasClosedFireplace(val) {
            this.toggleVisibleChildrenQuestions(val, ['hasBillingClosedFireplace'], 'OUI');
        },
        hasOpenedFireplace(val) {
            this.toggleVisibleChildrenQuestions(val, ['hasBillingOpenedFireplace'], 'OUI');
        },
        hasNoDisaster(val) {
            const childrenQuestionsList = [
                'nbDisastersWater',
                'nbDisastersCivil',
                'nbDisastersSteal',
                'nbDisastersOther',
                'nbDisastersClimatic',
            ];
            this.toggleVisibleChildrenQuestions(val, childrenQuestionsList, 'NON');
        },
	},
	methods: {
		 // Gére l'affichage conditionnel des questions enfants
		toggleVisibleChildrenQuestions(val, childrenQuestionsList, activatorResponse) {
            let childrenQuestionsVisible = {};
            childrenQuestionsList.forEach(childName => {
                childrenQuestionsVisible[childName] = false;
            });

            if (val === activatorResponse) {
                childrenQuestionsList.forEach(childName => {
                    childrenQuestionsVisible[childName] = true;
                });
            }

            this.childrenQuestionsVisible = {
                ...this.childrenQuestionsVisible,
                ...childrenQuestionsVisible,
            }
        },
	},
}