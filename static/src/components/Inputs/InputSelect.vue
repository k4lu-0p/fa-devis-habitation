<template lang="pug">
    v-select(
        v-bind="$attrs"
        v-on="$listeners"
        :loading="loading"
        :items="getItems"
        no-data-text="Aucun éléments..."
    )
</template>

<script>
    import _ from 'lodash'

    export default {
        props: {
            api: {},
            items: {
                type: Array
            }
        },
        data: () => ({
            loading: false,
            apiItems: []
        }),
        watch: {
            api: {
                handler(api, oldApi) {
                    if (!_.isEqual(api, oldApi)) {
                        let target = typeof this.api === 'object' && this.api.target
                            ? this.api.target
                            : 'data'

                        this.apiUrl()
                            .then(res => this.apiItems = res[target])
                            .finally(() => this.loading = false)
                    }
                },
                immediate: true,
                deep: true
            }
        },
        computed: {
            getItems() {
                return this.api
                    ? this.apiItems
                    : this.items
            }
        },
        methods: {
            apiUrl() {
                this.loading = true
                if (typeof this.api === 'object') {
                    let verb = this.api.verb || 'get'
                    if (verb.toLowerCase() === 'get') {
                        let url = [this.api.url.replace(/^\/|\/$/g, '')]
                        if (this.api.params) {
                            Object.keys(this.api.params).forEach(key => {
                                url.push(encodeURIComponent(this.api.params[key]))
                            })
                        }

                        // noinspection JSUnresolvedFunction
                        return this.$axios.$get(url.join('/'))
                    } else if (verb.toLowerCase() === 'post') {
                        let params = this.api.params || {}
                        let formData = {...params}

                        // noinspection JSUnresolvedFunction
                        return this.$axios.$post(this.api.url, formData)
                    }
                }

                // noinspection JSUnresolvedFunction
                return this.$axios.$get(this.api.replace(/^\/|\/$/g, ''))
            }
        }
    }
</script>
