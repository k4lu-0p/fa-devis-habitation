import $const from '../../constants';

export default {
    methods: {
        // only works with Vuelidate
        makeFieldValidationsErrors(stepName, field, rules = []) {
            const errors = [];
            if (!this.$v[field].$dirty) return errors;
            rules.forEach(rule => {
                if (!this.$v[field][rule]) {
                    errors.push($const.fields[stepName][field].rules[rule]);
                }
            });
            return errors;
        }
    },
    computed: {

        /**
         * -----------------
         *  STEP 1
         * -----------------
         */
        firstnameErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'firstname', ['required']);
        },
        lastnameErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'lastname', ['required']);
        },
        civilityErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'civility', ['required']);
        },
        familySituationErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'familySituation', ['required']);
        },
        addressErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'address', ['required']);
        },
        cityErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'city', ['required']);
        },
        birthDateErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'birthDate', [
                'required',
                'checkBirthdate',
            ]);
        },
        hasPropertySameAddressErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'hasPropertySameAddress', ['required']);
        },
        jobErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'job', ['required']);
        },
        emailErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'hasPropertySameAddress', [
                'required',
                'email',
            ]);
        },
        phoneErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'phone', [
                'required',
                'phoneFrenchRegex',
            ]);
        },
        addressPropertyErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'addressProperty', ['required']);
        },
        cityPropertyErrors () {
            return this.makeFieldValidationsErrors('subscriber', 'cityProperty', ['required']);
        },

        /**
         * -----------------
         *  STEP 2
         * -----------------
         */

        contextErrors () {
            return this.makeFieldValidationsErrors('property', 'context', ['required']);
        },
        qualityErrors () {
            return this.makeFieldValidationsErrors('property', 'quality', ['required']);
        },
        typePropertyErrors () {
            return this.makeFieldValidationsErrors('property', 'typeProperty', ['required']);
        },
        floorErrors () {
            return this.makeFieldValidationsErrors('property', 'floor', ['required']);
        },
        yearBuildingErrors () {
            return this.makeFieldValidationsErrors('property', 'yearBuilding', ['required']);
        },
        destinationPropertyErrors () {
            return this.makeFieldValidationsErrors('property', 'destinationProperty', ['required']);
        },
        numberMainRoomsErrors () {
            return this.makeFieldValidationsErrors('property', 'numberMainRooms', ['required']);
        },
        areaOutbuildingsErrors() {
            return this.makeFieldValidationsErrors('property', 'areaOutbuildings', [
                'required',
                'numeric'
            ]);
        },
        movableCapitalToBeGuaranteedErrors() {
            return this.makeFieldValidationsErrors('property', 'movableCapitalToBeGuaranteed', ['required']);
        },
        objectValuableCapitalErrors() {
            return this.makeFieldValidationsErrors('property', 'objectValuableCapital', ['required']);
        },
        // occupancyRateProfessionalUse() {
        //     return this.makeFieldValidationsErrors('property', 'occupancyRateProfessional', ['required']);
        // },

        /**
         * --------------
         * STEP 3
         * --------------
         */

        commercialCodeErrors() {
            return this.makeFieldValidationsErrors('estimate', 'commercialCode', ['required']);
        },
        desiredGuaranteeErrors() {
            return this.makeFieldValidationsErrors('estimate', 'desiredGuarantee', ['required']);
        },
    }
}