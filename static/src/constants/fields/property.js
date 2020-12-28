export default {
    addressProperty: {
        type: 'text',
        name: 'address-property',
        label: 'Adresse du bien',
        icon: 'mdi-road-variant',
        rules: {
            required: 'Veuillez choisir une adresse',
        },
    },
    additionalPropertyAddress: {
        type: 'text',
        name: 'additional-property-address',
        label: 'Complément d\'adresse du bien',
        icon: 'mdi-road-variant',
    },
    cityProperty: {
        type: 'search',
        name: 'city-property',
        label: 'Code postal du bien à assurer',
        icon: 'mdi-mailbox-open-up',
        rules: {
            required: 'Veuillez choisir un code postal / une ville',
        },
    },
    context: { //--OK
        type: 'select',
        name: 'context',
        label: 'Contexte de la demande de devis',
        choices: [
            {
                text: 'Bien déjà assuré par vos soins depuis plus d\'un an',
                value: 'BIEN_ASSURE_DEPUIS_PLUS_D_1AN',
            },
            {
                text: 'Bien déjà assuré par vos soins depuis moins d\'un an',
                value: 'BIEN_ASSURE_DEPUIS_MOINS_D_1AN',
            },
            {
                text: 'Nouveau bien - Déménagement',
                value: 'DEMENAGEMENT',
            },
            {
                text: 'Nouveau bien - Bien suplémentaire',
                value: 'BIEN_SUPPLEMENTAIRE',
            }
        ],
        rules: {
            required: 'Veuillez choisir un contexte pour votre demande',
        },
    },
    quality: { //--OK
        type: 'radio',
        name: 'quality',
        label: 'Qualité de l\'assuré',
        choices: [
            {
                text: 'Propriétaire',
                value: 'PRO',
            },
            {
                text: 'Locataire',
                value: 'LOC',
            },
        ],
    },
    typeProperty: { //--OK
        type: 'radio',
        name: 'type-property',
        label: 'Nature du bien',
        choices: [
            {
                text: 'Maison',
                value: 'MAISON',
            },
            {
                text: 'Appartement',
                value: 'APPART',
            },
        ],
    },
    floor: { //--OK
        type: 'select',
        name: 'floor',
        label: 'Étage',
        choices: [
            {
                text: 'Rez-de-chaussée',
                value: 'RDC'
            },
            {
                text: 'Étage intermédiaire',
                value: 'INTERMED',
            },
            {
                text: 'Garage collectif clos / fermé',
                value: 'DERETAGE',
            }
        ],
        rules: {
            required: 'Veuillez choisir l\'étage ou se situe l\'appartement',
        },
    },
    yearBuilding: { //--OK
        type: 'select',
        name: 'year-building',
        label: 'Année de construction',
        choices: [
            {
                text: 'Postérieur à 2010',
                value: 'POST2010'
            },
            {
                text: 'Comprise entre 1950 et 2010',
                value: '19502010',
            },
            {
                text: 'Antérieur à 1950',
                value: 'AVANT1950',
            },
        ],
        rules: {
            required: 'Veuillez selectionner l\'année de construction',
        },
    },
    destinationProperty: { //--OK
        type: 'radio',
        name: 'destination-property',
        label: 'Destination du bien',
        choices: [
            {
                text: 'Résidence principale',
                value: 'RESIDENCE_PRINCIPALE',
            },
            {
                text: 'Résidence secondaire',
                value: 'RESIDENCE_SECONDAIRE',
            },
        ],
        tooltipCode: 'HA_DESTINATION_BIEN',
    },
    numberMainRooms: { //--FOURNI PAR API
        type: 'select',
        name: 'number-main-rooms',
        label: 'Nombre de pièces principales',
        choices: [
            {text: 'TEST', value: 'TEST'}
        ],
        rules: {
            required: 'Veuillez selectionner le nombre de pièces principales',
        },
        tooltipCode: 'HA_DEFINITION_PIECES_PRINCIPALES',
    },
    areaOutbuildings: { //--OK
        type: 'number',
        name: 'area-outbuildings',
        label: 'Surface réelle des dépendances',
        rules: {
            required: 'Veuillez renseigner la surface réelle des dépendances',
            numeric: 'Nombre incorrect',
        },
        tooltipCode: 'HA_DEFINITION_DEPENDANCE',
    },
    movableCapitalToBeGuaranteed: { //--FOURNI PAR API
        type: 'select',
        name: 'movable-capital-to-be-guaranteed',
        label: 'Capital mobilier à garantir',
        choices: [
            {
                text: 'TEST',
                value: 'TEST',
            },
        ],
        rules: {
            required: 'Veuillez selectionner le montant du capital'
        }
    },
    objectValuableCapital: { //--OK
        type: 'select',
        name: 'object-valuable-capital',
        label: 'Dont capital objet de valeur à garantir',
        choices: [
            {
                text: 'Aucun',
                value: 'AUCUN',
            },
            {
                text: 'Inférieur ou égal à 10% du capital mobilier',
                value: 'INF10',
            },
            {
                text: 'Inférieur ou égal à 20% du capital mobilier',
                value: 'INF20',
            },
            {
                text: 'Supérieur à 20% du capital mobilier',
                value: 'SUP20',
            },
        ],
        rules: {
            required: 'Veuillez selectionner le montant du capital des objets de valeur'
        }
    },
    occupancyRateProfessionalUse: { //--OK
        type: 'select',
        name: 'occupancy-rate-professional-use',
        label: 'Taux d\'occupation usage professionnel',
        choices: []
    },
}