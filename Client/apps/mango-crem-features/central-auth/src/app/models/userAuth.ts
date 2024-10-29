export interface UserAuth {
  userId: number;
  email: string;
  clientKey?: string;
  hasMultipleSites?: boolean;
  isAutoProvisioned: boolean;
  isServiceAccount?: boolean;
  isRemUser?: boolean;
}
