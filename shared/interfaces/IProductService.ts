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
    firstStep(product: IProductInput): Promise<RegisterResult>;
    secondStep(product: IProductInput): Promise<RegisterResult>;
    thirdStep(product: IProductInput): Promise<RegisterResult>;
    fourthStep(product: IProductInput): Promise<RegisterResult>;
    closeBrowser(): Promise<void>;
  }
}
