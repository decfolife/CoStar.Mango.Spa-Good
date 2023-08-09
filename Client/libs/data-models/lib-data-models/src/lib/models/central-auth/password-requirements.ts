export interface PasswordRequirements {
    lowerCaseCriteria: string;
    upperCaseCriteria: string;
    digitsCriteria: string;
    specialCharsCriteria: string;
    minCharsCriteria: string;
    customCharsCriteria: string;
    minLength: number;
    maxLength: number;
}