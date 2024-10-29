export interface UpdatePasswordRequest {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  contactId: number;
  clientKey: string;
}
