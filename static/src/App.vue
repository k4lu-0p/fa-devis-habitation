<template lang="pug">
  router-view
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('fetchFieldsProvidedByAPI');
    this.$store.dispatch('fetchTooltipsProvidedByAPI');
  }
};
</script>
