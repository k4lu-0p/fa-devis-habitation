<template lang="pug">
	vue-recaptcha(
		ref="recaptcha"
		@verify="$emit('verify', $event)"
		@expired="$emit('expired')"
		:sitekey="key"
	)
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
	data() {
		return {
			key: process.env.VUE_APP_RECAPTCHA_KEY_CLIENT,
		}
	},
	components: {
		VueRecaptcha,
	},
}
</script>

<style>

</style>