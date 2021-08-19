export default class ValidationUtils {

    static validatePWZ = (value) => {
        const v = value.toString();
        if (v.length !== 7) {
            return "Numer PWZ powinien składać się z 7 cyfr"
        }

        const splitNumbers = v.split("");
        const arrayNumbers = splitNumbers.map(Number)
        const controlNumber = arrayNumbers[0]

        let sum = 0;
        for (let i = 0; i < arrayNumbers.length; i++) {
            sum += arrayNumbers[i] * i
        }

        const calculateControlNumber = sum % 11

        if (calculateControlNumber !== controlNumber) {
            return "Numer PWZ jest nieprawidłowy"
        }

    }

    static confirmPassword = (password, passwordConfirmation) => {
        if (password !== passwordConfirmation) {
            return "Hasła nie są identyczne"
        }
    }

}