import { useAlert } from "@/hooks/useAlert";

export function Alert() {
  const alert = useAlert();
  const boxColors = {
    error: "border-red-400 bg-red-100 text-red-700",
    success: "border-green-400 bg-green-100 text-green-700",
  };
  const textColors = {
    error: "text-red-500",
    success: "text-green-500",
  };

  const boxColor = boxColors[alert.state.severity];
  const textColor = textColors[alert.state.severity];

  const handleClickClose = () => {
    alert.closeAlert();
  };

  return (
    <div>
      {alert.state.isAlertOpen && (
        <div className="absolute bottom-8 left-12 w-3/4 animate-fade-in transition-all duration-75 ease-in">
          <div
            className={`relative rounded border  px-4 py-3 ${boxColor}`}
            role="alert"
          >
            <span className="sm:inline block">{alert.state.alertMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={handleClickClose}
                className={`h-6 w-6 fill-current ${textColor}`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
