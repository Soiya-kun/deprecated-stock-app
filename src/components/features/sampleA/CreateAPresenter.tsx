type Props = {
  sampleA: string;
  handleCLickOnButton: () => void;
};

export function CreateAPresenter({ sampleA, handleCLickOnButton }: Props) {
  return (
    <>
      <p>{sampleA}</p>
      <button type="button" onClick={handleCLickOnButton}>
        保存する
      </button>
    </>
  );
}
