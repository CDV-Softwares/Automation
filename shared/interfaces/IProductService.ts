import IProductInput from './IProductInput';

export namespace IProductService {
  export type RegisterResult = {
    message: string;
    status: number;
  };

  export interface Service {
    url: string;
    login: string;
    password: string;
    openBrowser(): Promise<void>;
    accessWebsiteInANewTabAndLogin(): Promise<void>;
    startRegistering(product: IProductInput): Promise<RegisterResult>;
    closeBrowser(): Promise<void>;
  }
}
