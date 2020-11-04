export default {
    context: {
        type: 'select',
        name: 'context',
        label: 'Contexte de la demande de devis',
        choices: [
            {
                text: 'Un exemple 1 de contexte',
                value: 'example-1'
            },
            {
                text: 'Un exemple 2 de contexte',
                value: 'example-2'
            }
        ]
    },
    quality: {
        type: 'radio',
        name: 'quality',
        label: 'Qualité de l\'assuré',
        choices: [
            {
                text: 'Propriétaire',
                value: 'owner',
            },
            {
                text: 'Locataire',
                value: 'locataire',
            },
        ],
    },
    typeProperty: {
        type: 'radio',
        name: 'type-property',
        label: 'Nature du bien',
        choices: [
            {
                text: 'Maison',
                value: 'house',
            },
            {
                text: 'Appartement',
                value: 'appartment',
            },
        ],
    },
    floor: {
        type: 'select',
        name: 'floor',
        label: 'Étage',
        choices: [
            {
                text: 'Rez-de-chaussée',
                value: 'rdc'
            },
            {
                text: '1er Étage',
                value: 'etage-1',
            }
        ],
    },
    yearBuilding: {
        type: 'select',
        name: 'year-building',
        label: 'Année de construction',
        choices: [
            {
                text: 'Postérieur à 2010',
                value: 'post-2010'
            },
            {
                text: 'Antérieur à 2010',
                value: 'ant-2010'
            },
        ],
    },
    destinationProperty: {
        type: 'radio',
        name: 'destination-property',
        label: 'Destination du bien',
        choices: [
            {
                text: 'Résidence principale',
                value: 'main',
            },
            {
                text: 'Résidence secondaire',
                value: 'secondary',
            },
        ],
    },
    numberMainRooms: {
        type: 'select',
        name: 'number-main-rooms',
        label: 'Nombre de pièces principales',
        choices: [
            {
                text: '1 pièce',
                value: 1,
            },
            {
                text: '2 pièces',
                value: 2,
            }
        ]
    }
}