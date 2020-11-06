import $const from '../../constants';

export default {
    computed: {

        /**
         * -----------------
         *  STEP 1
         * -----------------
         */
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

        /**
         * -----------------
         *  STEP 2
         * -----------------
         */

        contextErrors () {
            const errors = [];
            if (!this.$v.context.$dirty) return errors;
            !this.$v.context.required && errors.push(
                $const.fields.property.context.rules.required
            );
            return errors
        },
        qualityErrors () {
            const errors = [];
            if (!this.$v.quality.$dirty) return errors;
            !this.$v.quality.required && errors.push(
                $const.fields.property.quality.rules.required
            );
            return errors
        },
        typePropertyErrors () {
            const errors = [];
            if (!this.$v.typeProperty.$dirty) return errors;
            !this.$v.typeProperty.required && errors.push(
                $const.fields.property.typeProperty.rules.required
            );
            return errors
        },
        floorErrors () {
            const errors = [];
            if (!this.$v.floor.$dirty) return errors;
            !this.$v.floor.required && errors.push(
                $const.fields.property.floor.rules.required
            );
            return errors
        },
        yearBuildingErrors () {
            const errors = [];
            if (!this.$v.yearBuilding.$dirty) return errors;
            !this.$v.yearBuilding.required && errors.push(
                $const.fields.property.yearBuilding.rules.required
            );
            return errors
        },
        destinationPropertyErrors () {
            const errors = [];
            if (!this.$v.destinationProperty.$dirty) return errors;
            !this.$v.destinationProperty.required && errors.push(
                $const.fields.property.destinationProperty.rules.required
            );
            return errors
        },
        numberMainRoomsErrors () {
            const errors = [];
            if (!this.$v.numberMainRooms.$dirty) return errors;
            !this.$v.numberMainRooms.required && errors.push(
                $const.fields.property.numberMainRooms.rules.required
            );
            return errors
        },

        /**
         * --------------
         * STEP 3
         * --------------
         */

        commercialCodeErrors() {
            const errors = [];
            if (!this.$v.commercialCode.$dirty) return errors;
            !this.$v.commercialCode.required && errors.push(
                $const.fields.estimate.commercialCode.rules.required
            );
            return errors
        },
        desiredGuaranteeErrors() {
            const errors = [];
            if (!this.$v.desiredGuarantee.$dirty) return errors;
            !this.$v.desiredGuarantee.required && errors.push(
                $const.fields.estimate.desiredGuarantee.rules.required
            );
            return errors
        },
    }
}