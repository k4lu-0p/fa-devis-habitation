

export default {
    checkBirthdate(event) {
        let age = this.$moment(event, 'YYYY-MM-DD')

        return this.$moment().diff(age, 'years') >= 18
    },
    checkPermisdate(event) {
        let birthdate = this.$moment(this.formData.conducteurs.birthdate, 'YYYY-MM-DD')

        return this.$moment(event, 'YYYY-MM-DD').diff(birthdate, 'years') >= 18
    },
}