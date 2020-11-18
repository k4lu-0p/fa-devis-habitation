/*
Gère les réponses qui ne sont pas autorisées.
(Affiche une pop-up rouge si c'est le cas)
*/

import $const from '../../constants';

function makeWatchersForUnthorizedQuestions() {
	let watchers = {};
	let { additional: additionalConstants } = $const.fields;

	Object.keys(additionalConstants).forEach(section => {
		let questions = additionalConstants[section]['questions'];
		
		Object.keys(questions).forEach(question => {
			// Watchers générés pour les questions parentes
			if (questions[question].unauthorizedResponse) {
				watchers = {
					...watchers,
					[question](val) {
						// Si la réponse n'est pas autorisée et ne permet pas de continuer
						if (questions[question].unauthorizedResponse === val) {

							// La réponse n'est pas enregistré et le champ réinitialisé
							this.$store.commit('UPDATE_STEP_DATA', { 
								stepName: 'additional',
								stepData: { [question]: null },
							});
							
							// On informe l'utilisateur 
							this.isAlertActive = true;
						}
					}
				}
			}
			
			// Watchers générés pour les questions enfants
			if (questions[question].childrens) {
				let childrens = questions[question].childrens;
				Object.keys(childrens).forEach((child) => {
					watchers = {
						...watchers,
						[child](val) {
							if (childrens[child].unauthorizedResponse === val) {
								// La réponse n'est pas enregistré et le champ réinitialisé
								this.$store.commit('UPDATE_STEP_DATA', { 
									stepName: 'additional',
									stepData: { [child]: null },
								});
								
								// On informe l'utilisateur 
								this.isAlertActive = true;
							}
						}
					}

				})
			}

		})
	});

	return watchers;
}

export default {
	data() {
		return {
            renderForm: true,
		}
	},
	watch: makeWatchersForUnthorizedQuestions(),
	methods: {
		handleCloseAlert() {
			// ferme l'alerte
			this.isAlertActive = false;

			/** 
			 * HACK pour rafraichir la coche dans l'input radio.
			 * L'utilisation du mappage des computeds avec le state cause ce problème.
			 */
			let prevScrollYPosBeforeRefresh = window.scrollY;
			this.renderForm = false;
			this.$nextTick(() => {
				this.renderForm = true;
				this.$nextTick(() => {
					window.scrollTo(0, prevScrollYPosBeforeRefresh);
				})
			});
		}
	},
}