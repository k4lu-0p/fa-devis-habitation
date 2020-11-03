import $const from '../../constants';

export default {
    computed: {
        firstnameErrors () {
            const errors = [];
            if (!this.$v.firstname.$dirty) return errors;
            !this.$v.firstname.required && errors.push(
                $const.fields.subscriber.firstname.rules.required
            );
            return errors;
        },
        lastnameErrors () {
            const errors = [];
            if (!this.$v.lastname.$dirty) return errors;
            !this.$v.lastname.required && errors.push(
                $const.fields.subscriber.lastname.rules.required
            );
            return errors;
        },
        civilityErrors () {
            const errors = [];
            if (!this.$v.civility.$dirty) return errors;
            !this.$v.civility.required && errors.push(
                $const.fields.subscriber.civility.rules.required
            );
            return errors
        },
        familySituationErrors () {
            const errors = [];
            if (!this.$v.familySituation.$dirty) return errors;
            !this.$v.familySituation.required && errors.push(
                $const.fields.subscriber.familySituation.rules.required
            );
            return errors
        },
        addressErrors () {
            const errors = [];
            if (!this.$v.address.$dirty) return errors;
            !this.$v.address.required && errors.push(
                $const.fields.subscriber.address.rules.required
            );
            return errors
        },
        // additionalAddressErrors () {
        //     const errors = [];
        //     if (!this.$v.additionalAddress.$dirty) return errors;
        //     !this.$v.additionalAddress.required && errors.push(
        //         $const.fields.subscriber.address.rules.required
        //     );
        //     return errors
        // },
        cityErrors () {
            const errors = [];
            if (!this.$v.city.$dirty) return errors;
            !this.$v.city.required && errors.push(
                $const.fields.subscriber.city.rules.required
            );
            return errors
        },
        birthDateErrors () {
            const errors = [];
            if (!this.$v.birthDate.$dirty) return errors;
            !this.$v.birthDate.required && errors.push(
                $const.fields.subscriber.birthDate.rules.required
            );
            return errors
        },
        hasPropertySameAddressErrors () {
            const errors = [];
            if (!this.$v.hasPropertySameAddress.$dirty) return errors;
            !this.$v.hasPropertySameAddress.required && errors.push(
                $const.fields.subscriber.hasPropertySameAddress.rules.required
            );
            return errors
        },
        cityPropertyErrors () {
            const errors = [];
            if (!this.$v.cityProperty.$dirty) return errors;
            !this.$v.cityProperty.required && errors.push(
                $const.fields.subscriber.cityProperty.rules.required
            );
            return errors
        },
        // emailErrors () {
        //     const errors = [];
        //     if (!this.$v.email.$dirty) return errors;
        //     !this.$v.email.email && errors.push('Must be valid e-mail');
        //     !this.$v.email.required && errors.push('E-mail is required');
        //     return errors;
        // },
    }
}