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
                        label: 'Oui',
                        value: true,
                    },
                    {
                        label: 'Non',
                        value: false,
                    },
                ],
            },
            isCoveredWithHeavyMaterials: {
                type: 'radio',
                name: 'is-covered-with-heavy-materials',
                label: 'Est-il couvert en matériaux durs ?',
                choices: [
                    {
                        label: 'Oui',
                        value: true,
                    },
                    {
                        label: 'Non',
                        value: false,
                    },
                ],
            },
        },
    },
}