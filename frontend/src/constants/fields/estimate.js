export default {
	commercialCode: {
		type: 'text',
		name: 'commercial-code',
		label: 'Code commercial',
		icon: 'mdi-briefcase',
		rules: {
			required: 'Le code commercial est obligatoire',
		},
	},
	desiredGuarantee: {
        type: 'radio',
		name: 'desired-guarantee',
		label: 'Garanties souhaitées',
        rules: {
            required: 'Veuillez cocher au moins une des deux cases',
        },
        choices: [
            {
                text: 'Tiers',
                value: 'tiers',
            },
            {
                text: 'Tiers, vol, incendies, bris de glace',
                value: 'tiers-plus',
			},
			{
                text: 'Tous risques',
                value: 'tous-risques',
            },
        ],
    },
}