import { useAlert } from "@/hooks/useAlert";

export function SampleAlertPage() {
  const alert = useAlert();
  const handleClickSuccessfulButton = () => {
    alert.showSuccess("成功😀");
  };
  const handleClickErrorButton = () => {
    alert.showError("失敗😭");
  };
  return (
    <>
      <button type="button" onClick={handleClickSuccessfulButton}>
        成功ボタン
      </button>
      <button type="button" onClick={handleClickErrorButton}>
        失敗ボタン
      </button>
    </>
  );
}
