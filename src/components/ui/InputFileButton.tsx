import { ChangeEvent, useRef } from "react";
import { FaFileUpload } from "react-icons/all";

import { Button } from "@/components/ui/Button";
import { InputFile } from "@/components/ui/InputFile";

export type Props = {
  name?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
  helptext?: string;
};

export function InputFileButton({
  name,
  className,
  onChange,
  onBlur,
  accept = "image/jpeg, image/png",
  multiple = false,
  helptext,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileUpload = () => {
    if (inputRef.current != null) inputRef.current.click();
  };
  return (
    <div>
      <div className={`flex ${className}`}>
        <InputFile
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          accept={accept}
          multiple={multiple}
        />
        <Button
          variant="primary"
          onClick={fileUpload}
          className="flex h-max w-full items-center px-2"
        >
          <FaFileUpload className="mr-1" />
          <p className="w-max">ファイルをアップロード</p>
        </Button>
      </div>
      <p className="mt-2 text-xs">{helptext}</p>
    </div>
  );
}
