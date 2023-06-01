import { useNavigate } from "react-router-dom";

import { ButtonWithError } from "@/components/ui/ButtonWithError";
import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { appURL } from "@/config/url";
import { useLoginHook } from "@/hooks/loginHook";

export function Login() {
  const loginHook = useLoginHook();

  const navigate = useNavigate();

  const handleClickOnLoginButton = async () => {
    await loginHook.login();
    navigate(appURL.myPage);
  };

  return (
    <div className="flex min-h-content items-center">
      <div className="mx-auto w-full max-w-sm">
        <h1>ログイン</h1>
        <form onSubmit={loginHook.login}>
          <fieldset
            className="flex w-full flex-col gap-4"
            disabled={loginHook.isLogining}
          >
            <InputWithTitleAndError
              label="メールアドレス"
              name="email"
              type="email"
              inputHook={loginHook}
            />
            <InputWithTitleAndError
              label="パスワード"
              name="password"
              inputHook={loginHook}
              type="password"
            />
            <ButtonWithError
              onClick={handleClickOnLoginButton}
              variant="primary"
              buttonClassName="w-full"
              className="mt-8 w-full"
            >
              ログイン
            </ButtonWithError>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
