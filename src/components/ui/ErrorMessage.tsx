export function ErrorMessage({
  message,
  hidden,
}: {
  message: string;
  hidden: boolean;
}) {
  return (
    <p className="my-4 text-sm text-red-500" hidden={hidden}>
      {message}
    </p>
  );
}
