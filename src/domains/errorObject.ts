export type ErrorObject = {
  message: string;
  hasError: boolean;
};

export const noError = (): ErrorObject => ({
  message: "",
  hasError: false,
});

export const error = (message: string): ErrorObject => ({
  message,
  hasError: true,
});
