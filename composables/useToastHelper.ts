import { useToast } from "vue-toastification";

export const useFormToast = (
  error: any,
  successMessage: string,
  errorMessage: string
) => {
  if (!error) {
    useToast().success(successMessage);
  } else {
    useToast().error(errorMessage);
  }
};

export const useSimpleToast = (
  error: any,
  successMessage: string,
  errorMessage: string
) => {
  if (!error) {
    useToast().success(successMessage);
  } else {
    useToast().error(`${errorMessage}: ${error}`);
  }
};

export const useErrorToast = (
  error: any,
) => {
  if (error) {
    useToast().error(`${error}`);
  }
}
