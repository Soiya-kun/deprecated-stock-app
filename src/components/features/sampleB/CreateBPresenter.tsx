type Props = {
  sampleB: string;
  handleCLickOnButton: () => void;
};

export function CreateBPresenter({ sampleB, handleCLickOnButton }: Props) {
  return (
    <>
      <p>{sampleB}</p>
      <button type="button" onClick={handleCLickOnButton}>
        保存する
      </button>
    </>
  );
}
