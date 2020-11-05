export default {
    mainBuilding: {
        title: 'Bâtiment principal',
        questions: {
            isBuildedWithHeavyMaterials: {
                type: 'radio',
                name: 'is-builded-with-heavy-materials',
                label: 'Est-il construit en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
                tooltip: 'Détail sur la question',
            },
            isCoveredWithHeavyMaterials: {
                type: 'radio',
                name: 'is-covered-with-heavy-materials',
                label: 'Est-il couvert en matériaux durs ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
                tooltip: 'Détail sur la question',
            },
            hasWoodenSkeleton: {
                type: 'radio',
                name: 'has-wooden-skeleton',
                label: 'Possède-t-il une ossature bois et/ou est-il bardé en bois ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
        },
    },
    equipments: {
        title: 'Équipement',
        questions: {
            hasSwimmingPool: {
                type: 'radio',
                name: 'has-swimming-pool',
                label: 'Piscine',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasVeranda: {
                type: 'radio',
                name: 'has-veranda',
                label: 'Veranda',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasSolarPannels: {
                type: 'radio',
                name: 'has-solar-pannels',
                label: 'Panneaux solaire ou photovoltaïques',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasClosedFireplace: {
                type: 'radio',
                name: 'has-closed-fireplace',
                label: 'Poêle à bois, granules, pellets, cheminée à foyer fermé',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasOpenedFireplace: {
                type: 'radio',
                name: 'has-opened-fireplace',
                label: 'Cheminée à foyer ouvert',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
        },
    },
    specifities: {
        title: 'Spécificités',
        questions: {
            isOnUnbuildableLand: {
                type: 'radio',
                name: 'is-on-unbuildable-land',
                label: 'Habitation construite sur un terrain classé inconstructible par un plan d\'exposition (des risques naturels ou risques technologiques) ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            isHistoricalMonument: {
                type: 'radio',
                name: 'is-historical-monument',
                label: 'Bien classé monument historique, ou classé à l\'inventaire supplémentaire des monuments historiques ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasPartiallyProUse: {
                type: 'radio',
                name: 'has-partially-pro-use',
                label: 'Bien utilisé, même partiellement pour un usage professionnel',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },            
            isCastleType: {
                type: 'radio',
                name: 'is-castle-type',
                label: 'Bien de type château, manoir, ...',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            isInsulated: {
                type: 'radio',
                name: 'is-insulated',
                label: 'Bien isolé (situé à plus de 200km de toute habitation régulièrement occupée)',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
        },
    },
    antecedents: {
        title: 'Antécédents',
        questions: {
            hasAlreadyTerminatedContract: {
                type: 'radio',
                name: 'has-already-terminated-contract',
                label: 'Résiliation d\'un contrat habitation par un autre assureur au cours des 60 derniers mois',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
            hasNoDisaster: {
                type: 'radio',
                name: 'has-no-disaster',
                label: 'Absence totale de sinistre au cours des 36 derniers mois concernant le bien à assurer ?',
                choices: [
                    {
                        text: 'Oui',
                        value: true,
                    },
                    {
                        text: 'Non',
                        value: false,
                    },
                ],
            },
        },
    },
}