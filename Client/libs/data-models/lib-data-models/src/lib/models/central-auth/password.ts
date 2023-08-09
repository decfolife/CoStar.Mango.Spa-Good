import { PasswordRequirements } from "./password-requirements";

export interface Password {
    isResetTokenValid: boolean;
    userEmail: string;
    passwordRequirements: PasswordRequirements;
}