import { InputWithTitleAndError } from "@/components/ui/InputWithTitleAndError";
import { useLoginHook } from "@/hooks/loginHook";

export function Login() {
  const loginHook = useLoginHook();
  return (
    <div>
      <h1>Login</h1>
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
        </fieldset>
      </form>
    </div>
  );
}
