<template lang="pug">
    v-app
        v-app-bar.pa-0(fixed dark app :elevation="1" color="primary")
            v-toolbar-title.px-2.d-none.d-md-block Contactez nous
            v-spacer
            a.d-none.d-md-block
                v-img(src="../assets/images/working-luxembourg.png" max-height="32px" contain)
            a.d-none.d-md-block
                v-img(src="../assets/images/working-suisse.png" max-height="32px" contain)
            v-spacer
            v-btn.px-2(text href="$config.returnUrl")
                span Retour accueil
                v-icon mdi-arrow-left
        v-main
            v-container
                v-row
                    v-col.pa-0(cols="4" offset="4")
                        v-img(src="../assets/images/logo.png" max-height="100px" contain)
            v-divider(color="primary").mb-3.header-divider
            
            v-container
                v-row(justify="center")
                    slot

        v-footer(color="primary" dark)
            v-spacer
            strong
                small(v-html="'&copy;' + new Date().getFullYear()")
</template>

<script>
export default {
}
</script>

<style>

</style>