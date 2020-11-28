export default {
    mainBuilding: {
        title: 'Bâtiment principal',
        questions: {
            isBuildedWithHeavyMaterials: {
                type: 'radio-list',
                name: 'is-builded-with-heavy-materials',
                label: 'Est-il construit en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                tooltip: 'Détail sur la question',
                unauthorizedResponse: 'NON',
            },
            isCoveredWithHeavyMaterials: {
                type: 'radio-list',
                name: 'is-covered-with-heavy-materials',
                label: 'Est-il couvert en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                tooltip: 'Détail sur la question',
                unauthorizedResponse: 'NON',
            },
            hasWoodenSkeleton: {
                type: 'radio-list',
                name: 'has-wooden-skeleton',
                label: 'Possède-t-il une ossature bois et/ou est-il bardé en bois ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
            },
        },
    },
    outbuildings: {
        title: 'Dépendances',
        questions: {
            isOutbuildingBuildedWithHeavyMaterials: {
                type: 'radio-list',
                name: 'is-builded-with-heavy-materials',
                label: 'Est-il construit en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                tooltip: 'Détail sur la question',
                unauthorizedResponse: 'NON',
            },
            isOutbuildingCoveredWithHeavyMaterials: {
                type: 'radio-list',
                name: 'is-covered-with-heavy-materials',
                label: 'Est-il couvert en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                tooltip: 'Détail sur la question',
                unauthorizedResponse: 'NON',
            },
            hasOutbuildingWoodenSkeleton: {
                type: 'radio-list',
                name: 'has-wooden-skeleton',
                label: 'Possède-t-il une ossature bois et/ou est-il bardé en bois ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
            },
        },
    },
    equipments: {
        title: 'Équipement',
        questions: {
            hasSwimmingPool: {
                type: 'radio-list',
                name: 'has-swimming-pool',
                label: 'Piscine',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                rules: {
                    required: 'Veuillez selectionner une proposition de réponse',
                },
                childrens: {
                    isAbovegroundSwimmingPool: {
                        type: 'radio-list',
                        name: 'is-aboveground-swimming-pool',
                        label: 'Hors sol ?',
                        choices: [
                            {
                                text: 'Oui',
                                value: 'OUI',
                            },
                            {
                                text: 'Non',
                                value: 'NON',
                            },
                        ],
                    },
                    isCoveredSwimmingPool: {
                        type: 'radio-list',
                        name: 'is-covered-swimming-pool',
                        label: 'Couverte ?',
                        choices: [
                            {
                                text: 'Oui',
                                value: 'OUI',
                            },
                            {
                                text: 'Non',
                                value: 'NON',
                            },
                        ],
                    },
                },
            },
            hasVeranda: {
                type: 'radio-list',
                name: 'has-veranda',
                label: 'Veranda',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                rules: {
                    required: 'Veuillez selectionner une proposition de réponse',
                },
                childrens: {
                    verandaSurface: {
                        type: 'number',
                        name: 'veranda-surface',
                        label: 'Surface (en m2)',
                    },
                }
            },
            hasSolarPannels: {
                type: 'radio-list',
                name: 'has-solar-pannels',
                label: 'Panneaux solaire ou photovoltaïques',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                rules: {
                    required: 'Veuillez selectionner une proposition de réponse',
                },
                childrens: {
                    solarPannelsSurface: {
                        type: 'number',
                        name: 'solar-pannels-surface',
                        label: 'Surface (en m2)',
                        rules: {
                            required: 'Veuillez saisir la surface en m2 de vos panneaux solaires',
                        },
                    },
                },
            },
            hasClosedFireplace: {
                type: 'radio-list',
                name: 'has-closed-fireplace',
                label: 'Poêle à bois, granules, pellets, cheminée à foyer fermé',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                childrens: {
                    hasBillingClosedFireplace: {
                        type: 'radio-list',
                        name: 'has-billing-closed-fireplace',
                        label: 'Réalisation / installation par professionnel (factures disponibles)',
                        choices: [
                            {
                                text: 'Oui',
                                value: 'OUI',
                            },
                            {
                                text: 'Non',
                                value: 'NON',
                            },
                        ],
                        rules: {
                            required: 'Réponse obligatoire',
                        },
                        unauthorizedResponse: 'NON',
                    },
                }
            },
            hasOpenedFireplace: {
                type: 'radio-list',
                name: 'has-opened-fireplace',
                label: 'Cheminée à foyer ouvert',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                childrens: {
                    hasBillingOpenedFireplace: {
                        type: 'radio-list',
                        name: 'has-billing-opened-fireplace',
                        label: 'Réalisation / installation par professionnel (factures disponibles)',
                        choices: [
                            {
                                text: 'Oui',
                                value: 'OUI',
                            },
                            {
                                text: 'Non',
                                value: 'NON',
                            },
                        ],
                        rules: {
                            required: 'Réponse obligatoire',
                        },
                        unauthorizedResponse: 'NON',
                    },
                },
            },
        },
    },
    specifities: {
        title: 'Spécificités',
        questions: {
            isOnUnbuildableLand: {
                type: 'radio-list',
                name: 'is-on-unbuildable-land',
                label: 'Habitation construite sur un terrain classé inconstructible par un plan d\'exposition (des risques naturels ou risques technologiques) ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                unauthorizedResponse: 'OUI',
            },
            isHistoricalMonument: {
                type: 'radio-list',
                name: 'is-historical-monument',
                label: 'Bien classé monument historique, ou classé à l\'inventaire supplémentaire des monuments historiques ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                unauthorizedResponse: 'OUI',
            },
            hasPartiallyProUse: {
                type: 'radio-list',
                name: 'has-partially-pro-use',
                label: 'Bien utilisé, même partiellement pour un usage professionnel',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                unauthorizedResponse: 'OUI',
            },            
            isCastleType: {
                type: 'radio-list',
                name: 'is-castle-type',
                label: 'Bien de type château, manoir, ...',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                unauthorizedResponse: 'OUI',
            },
            isInsulated: {
                type: 'radio-list',
                name: 'is-insulated',
                label: 'Bien isolé (situé à plus de 200km de toute habitation régulièrement occupée)',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                unauthorizedResponse: 'OUI',
            },
        },
    },
    antecedents: {
        title: 'Antécédents',
        questions: {
            hasAlreadyTerminatedContract: {
                type: 'radio-list',
                name: 'has-already-terminated-contract',
                label: 'Résiliation d\'un contrat habitation par un autre assureur au cours des 60 derniers mois',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
            },
            hasNoDisaster: {
                type: 'radio-list',
                name: 'has-no-disaster',
                label: 'Absence totale de sinistre au cours des 36 derniers mois concernant le bien à assurer ?',
                choices: [
                    {
                        text: 'Oui',
                        value: 'OUI',
                    },
                    {
                        text: 'Non',
                        value: 'NON',
                    },
                ],
                childrens: {
                    nbDisastersWater: { //--OK
                        type: 'select',
                        name: 'nb-disasters-water',
                        placeholder: 'Choisir dans la liste',
                        label: 'Nombre de sinistres dégats des eaux',
                        choices: [
                            {
                                text: '0',
                                value: 0,
                            },
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                            {
                                text: 'Plus de 2',
                                value: -1,
                            }
                        ],
                        unauthorizedResponse: -1,

                    },
                    nbDisastersCivil: { //--OK
                        type: 'select',
                        name: 'nb-disasters',
                        placeholder: 'Choisir dans la liste',
                        label: 'Nombre de sinistres responsabilité civile',
                        choices: [
                            {
                                text: '0',
                                value: 0,
                            },
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                            {
                                text: 'Plus de 2',
                                value: -1,
                            }
                        ],
                    },
                    nbDisastersSteal: { //--OK
                        type: 'select',
                        name: 'nb-disasters-steal',
                        placeholder: 'Choisir dans la liste',
                        label: 'Nombre de sinistres vol / tentative de vol',
                        choices: [
                            {
                                text: '0',
                                value: 0,
                            },
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                            {
                                text: 'Plus de 2',
                                value: -1,
                            }
                        ],
                        unauthorizedResponse: -1,
                    },
                    nbDisastersOther: { //--OK
                        type: 'select',
                        name: 'nb-disasters-other',
                        label: 'Nombre d\'autres sinistres',
                        placeholder: 'Choisir dans la liste',
                        choices: [
                            {
                                text: '0',
                                value: 0,
                            },
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                            {
                                text: 'Plus de 2',
                                value: -1,
                            }
                        ],
                        unauthorizedResponse: -1,
                    },
                    nbDisastersClimatic: { //--OK
                        type: 'select',
                        name: 'nb-disasters',
                        label: 'Nombre de sinistres événements climatiques',
                        placeholder: 'Choisir dans la liste',
                        choices: [
                            {
                                text: '0',
                                value: 0,
                            },
                            {
                                text: '1',
                                value: 1,
                            },
                            {
                                text: '2',
                                value: 2,
                            },
                            {
                                text: 'Plus de 2',
                                value: -1,
                            }
                        ],
                        unauthorizedResponse: -1,
                    },
                }
            },
        },
    },
}