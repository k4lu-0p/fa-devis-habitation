export default {
    methods: {
        checkBirthdate(value) {
            let age = this.$moment(value, 'YYYY-MM-DD')
            return this.$moment().diff(age, 'years') >= 18
        },
    }
}