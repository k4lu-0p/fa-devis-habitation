export default {
    firstname: {
        type: 'text',
        name: 'firstname',
        label: 'Prénom',
        icon: 'mdi-account-box',
        rules: {
            required: 'Votre prénom est obligatoire',
        },
    },
    lastname: {
        type: 'text',
        name: 'lastname',
        label: 'Nom',
        icon: 'mdi-account-box',
        rules: {
            required: 'Votre nom est obligatoire',
        },
    },
    civility: {
        type: 'select',
        name: 'civility',
        label: 'Civilité',
        icon: 'mdi-gender-male-female',
        rules: {
            required: 'Votre civilité est obligatoire',
        },
        choices: [
            {
                text: 'Monsieur',
                value: 'monsieur'
            },
            {
                text: 'Madame',
                value: 'madame',
            }
        ],
    },
    familySituation: {
        type: 'select',
        name: 'family-situation',
        label: 'Situation Familiale',
        icon: 'mdi-account-question',
        rules: {
            required: 'Votre situation familiale est obligatoire',
        },
        choices: [
            {
                text: 'Célibataire',
                value: 'celibataire'
            },
            {
                text: 'En concubinage',
                value: 'concubinage',
            },
            {
                text: 'Mariée',
                value: 'mariee'
            },
        ],
    },
    address: {
        type: 'text',
        name: 'address',
        label: 'Adresse',
        icon: 'mdi-road-variant',
        rules: {
            required: 'Veuillez choisir une adresse',
        },
    },
    additionalAddress: {
        type: 'text',
        name: 'addtional-address',
        label: 'Complément d\'adresse',
        icon: 'mdi-road-variant',
    },
    city: {
        type: 'search',
        name: 'city',
        label: 'Code postal / Ville',
        icon: 'mdi-mailbox-open-up',
        rules: {
            required: 'Veuillez choisir un code postal / une ville',
        },
    },
    birthDate: {
        type: 'date',
        name: 'birth-date',
        label: 'Date de naissance',
        icon: 'mdi-card-account-details',
        rules: {
            required: 'Votre date de naissance est obligatoire',
        },
    },
    hasPropertySameAddress: {
        type: 'radio',
        name: 'has-property-same-address',
        rules: {
            required: 'Veuillez cocher au moins une des deux cases',
        },
        choices: [
            {
                text: 'Le Bien à assurer se situe à la même adresse',
                value: true,
            },
            {
                text: 'Le Bien à assurer se situe à une adresse différente',
                value: false,
            },
        ],
    },
    cityProperty: {
        type: 'search',
        name: 'city-property',
        label: 'Code postal / Ville du bien à assurer',
        icon: 'mdi-mailbox-open-up',
        rules: {
            required: 'Veuillez choisir un code postal / une ville',
        },
    }
}