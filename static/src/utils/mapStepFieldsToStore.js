/**  Génère les variables computed (v-mode des champs) 
en les liants avec le store (à l'aide des setters/getters) */

import _store from '../store';

export default function mapStepFieldsToStore(fields, stepName, store = _store,) {
    let computeds = {};
    fields.forEach(field => {
        let computed = {
            [field] : {
                get() {
                    return store.getters['getStep'](stepName)[field];
                },
                set(value) {
                    store.commit('UPDATE_STEP_DATA', { 
                        stepName: stepName,
                        stepData: { [field]: value },
                    });
                },
            }
        }
        Object.assign(computeds, computed);
    });
    return computeds;
}