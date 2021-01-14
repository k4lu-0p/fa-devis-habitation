<template lang="pug">
	div
		v-spacer
		v-toolbar(dense color="transparent" flat)
			v-toolbar-title Votre interlocuteur
		v-card-text.py-0
			v-row
				template(v-if="nTypeClientDetecte === 1")
					v-col.py-1(cols="12")
						p.ma-0 Selon les informations que vous nous avez transmises, l’interlocuteur Frontassur le plus proche de votre domicile est
				template(v-else)
					v-col.py-1(cols="12")
						p Selon les informations que vous nous avez transmises, il semble que vous soyez déjà client Frontassur.
						p.ma-0 Toutefois nous avons dorénavant décidé de commercialiser nos contrats via un réseau de partenaires locaux. Le plus proche de votre domicile est
				v-col.py-1(cols="12")
					v-card(outlined)
						slot
				template(v-if="nTypeClientDetecte === 1")
					v-col.py-1(cols="12")
						p.ma-0 C’est lui qui gérera votre dossier si vous souhaitez souscrire le contrat qui vous a été proposé. Nous lui transmettons donc également ce devis.
				template(v-else)
					v-col.py-1(cols="12")
						p C’est lui qui gérera directement votre dossier si vous souhaitez souscrire le contrat qui vous a été proposé.
						p.ma-0 Nous lui transmettons donc également ce devis.
</template>

<script>
export default {
	props: {
		nTypeClientDetecte: Number,
	}
}
</script>

<style>

</style>