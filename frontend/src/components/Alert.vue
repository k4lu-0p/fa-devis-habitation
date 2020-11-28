<template lang="pug">
	v-dialog(:value="isActive" max-width="290" persistent)
		v-card
			v-card-title.headline Nous sommes désolé
			v-card-text Cette réponse ne permet pas de donner une suite positive à votre demande.

			v-card-actions
				v-spacer
				v-btn(color="green darken-1" text @click="$emit('close')") Je comprends
</template>

<script>
export default {
	name: 'Alert',
	props: {
		isActive: Boolean,
	}
}
</script>

<style>

</style>