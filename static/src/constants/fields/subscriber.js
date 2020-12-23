export default {
    firstname: { //--OK
        type: 'text',
        name: 'firstname',
        label: 'Prénom',
        icon: 'mdi-account-box',
        rules: {
            required: 'Votre prénom est obligatoire',
        },
    },
    lastname: { //--OK
        type: 'text',
        name: 'lastname',
        label: 'Nom',
        icon: 'mdi-account-box',
        rules: {
            required: 'Votre nom est obligatoire',
        },
    },
    civility: { //--OK
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
                value: 'M'
            },
            {
                text: 'Madame',
                value: 'F',
            }
        ],
    },
    gender: { //--OK
        type: 'select',
        name: 'gender',
        label: 'Sexe',
        icon: 'mdi-gender-male-female',
        rules: {
            required: 'Votre sexe est obligatoire',
        },
        choices: [
            {
                text: 'Masculin',
                value: 'M'
            },
            {
                text: 'Féminin',
                value: 'F',
            }
        ],
    },
    familySituation: { //--OK
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
                value: 'CELIBATAIRE'
            },
            {
                text: 'Concubinage',
                value: 'CONCUBINAGE',
            },
            {
                text: 'Marié(e)',
                value: 'MARIE',
            },
            {
                text: 'Pacsé(e)',
                value: 'PACS',
            },
            {
                text: 'Veuf / Veuve',
                value: 'VEUF',
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
        name: 'additional-address',
        label: 'Complément d\'adresse',
        icon: 'mdi-road-variant',
    },
    city: {
        type: 'search',
        name: 'city',
        label: 'Code postal',
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
            checkBirthdate: 'Vous devez être âgé d\'au moins 18 ans'
        },
    },
    hasPropertySameAddress: { //--OK
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
    job: { //--OK
        type: 'select',
        name: 'job',
        label: 'Profession',
        icon: 'mdi-briefcase',
        rules: {
            required: 'Veuillez selectionner votre type de profession',
        },
        choices: [
            {
                text: 'Salarié non cadre',
                value: 'SALANONCADRE',
            },
            {
                text: 'Salarié cadre',
                value: 'SALACADRE',
            },
            {
                text: 'Fonctionnaire',
                value: 'FONCTIONNAIRE',
            },
            {
                text: 'Militaire',
                value: 'MILITAIRE',
            },
            {
                text: 'Agriculteur et assimilé',
                value: 'AGRICU',
            },
            {
                text: 'Commerçant / Artisan',
                value: 'COMM_ARTISAN',
            },
            {
                text: 'Profession libérale',
                value: 'PROF_LIB',
            },
            {
                text: 'Chef d\'entreprise',
                value: 'CHEF_ENTR',
            },
            {
                text: 'Étudiant',
                value: 'ETUDIANT',
            },
            {
                text: 'Retraité',
                value: 'RETRAITE',
            },
            {
                text: 'Sans emploi',
                value: 'SANSEMPLOI',
            },
            {
                text: 'Autre',
                value: 'AUTRE',
            },
        ]
    },
    email: { //--OK
        type: 'mail',
        name: 'email',
        label: 'Email',
        icon: 'mdi-at',
        rules: {
            required: 'Veuillez saisir une adresse email',
            email: 'Veuillez saisir une adresse email valide',
        },
    },
    phone: { //--OK
        type: 'text',
        name: 'phone',
        label: 'Numéro de téléphone',
        icon: 'mdi-phone',
        rules: {
            required: 'Veuillez saisir votre numéro de téléphone',
            phoneFrenchRegex: 'Veuillez saisir un numéro de téléphone valide'
        },
    },
}