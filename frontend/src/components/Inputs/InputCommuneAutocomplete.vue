<template lang="pug">
	v-autocomplete(
		v-model="selected"
		:search-input.sync="search"
		:loading="loading"
		:items="items"
		hide-details
		hide-no-data
		@input="$emit('input', $event)"
	)
</template>

<script>
import _ from 'lodash';

export default {
	data() {
		return {
			baseUrl: 'https://geo.api.gouv.fr/communes',
			loading: false,
			search: null,
			selected: null,
			maxResult: 10,
			items: [],
		}
	},
	watch: {
		search(val) {
			val && val !== this.selected && this.handleSearch(val)
		}
	},
	methods: {
		handleSearch: _.debounce(async function (search) {
			const requestUrl = `${this.baseUrl}?codePostal=${search}`
			this.loading = true;
			const { data: results } = await this.$axios.get(requestUrl);
			if (results && results.length > 0) {
				this.items = _.uniq(results.map((result) => {
					if (result.codesPostaux.length && result.nom) {
						return (
							`${result.codesPostaux[0]} ${result.nom}`.toUpperCase()
						);
					}
				}));
			}
			this.loading = false;
		}, 500),
	}
}
</script>

<style>

</style>