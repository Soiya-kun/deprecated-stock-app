type Props = {
  className?: string;
};

export function LogoBrown({ className = "" }: Props) {
  return <img src="/icon-white.svg" alt="logo" className={className} />;
}
