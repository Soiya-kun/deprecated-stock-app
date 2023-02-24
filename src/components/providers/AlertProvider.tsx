import { createContext, useState } from "react";

type Severity = "success" | "error";

type AlertStates = {
  state: {
    isAlertOpen: boolean;
    alertMessage: string;
    severity: Severity;
  };
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  closeAlert: () => void;
};

function useAlertContextValues(): AlertStates {
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [severity, setSeverity] = useState<Severity>("success");

  const showError = (message: string) => {
    setAlertMessage(message);
    setSeverity("error");
    setAlertOpen(true);
  };

  const showSuccess = (message: string) => {
    setAlertMessage(message);
    setSeverity("success");
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  return {
    state: {
      isAlertOpen,
      alertMessage,
      severity,
    },
    showError,
    showSuccess,
    closeAlert,
  };
}

export const AlertContext = createContext({} as AlertStates);

export function AlertProvider({ children }: { children: JSX.Element }) {
  const value = useAlertContextValues();
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}
