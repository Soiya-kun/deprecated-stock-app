export function ErrorMessage({
  message,
  hidden,
}: {
  message: string;
  hidden: boolean;
}) {
  return (
    <p className="mt-1 text-sm text-red-500" hidden={hidden}>
      {message}
    </p>
  );
}
