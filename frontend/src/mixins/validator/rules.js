export default {
    methods: {
        checkBirthdate(event) {
            let age = this.$moment(event, 'YYYY-MM-DD')
            return this.$moment().diff(age, 'years') >= 18
        },
    }
}