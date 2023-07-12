export {};

declare global {
  type TextInput =
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url";

  type Salutation = "Herr" | "Frau" | "Hallo";
  type Title = "dr." | "prof." | "prof. dr.";

  type Option<T> = {
    value: T;
    label: string;
  };

  type InputRef<T> = {
    value: T;
    errorMsg?: string;
    error?: boolean;
  };

  type FormValidation = "required" | "url:prevent" | "email" | "tel" | "url";

  interface BackendFormValidationPayload {
    name: string;
    value: any;
    validations: FormValidation[];
  }

  interface FrontendFormValidationPayload {
    name: string;
    value: ref<InputRef<any>>;
    validations: FormValidation[];
  }

  interface UserCredentials {
    email: string;
    password: string;
  }

  interface Contact {
    id: string;
    salutation?: Salutation;
    title?: Title;
    firstName?: string;
    lastName: string;
    phone?: string;
    mobilePhone?: string;
    thumbnail?: string;
  }

  interface Company {
    id: string;
    name: string;
    website: string;
    email: string;
    phone?: string;
    thumbnail?: string;
    street: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    region: string;
  }

}
