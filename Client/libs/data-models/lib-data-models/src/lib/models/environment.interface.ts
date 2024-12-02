export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly name: string;
  abstract readonly isRestful: boolean;
  abstract readonly CAUrl?: string;
  abstract readonly cremBaseUrl?: string;
  abstract readonly baseApiUrl?: string;
  abstract readonly showPayload: boolean;
}
