import { useAuthContext } from "@/components/functionals/AuthContextProvider";
import { newToken } from "@/domains/auth/dto";
import { newUser } from "@/domains/user";
import { useFindMe } from "@/hooks/injections";

export const useFindMeHook = () => {
  const { auth, setAuth } = useAuthContext();

  // findMe
  const findMe = async () => {
    let me = newUser();
    let isLoggedIn = true;
    const find = useFindMe();
    try {
      me = await find();
    } catch (e) {
      isLoggedIn = false;
    }
    setAuth({
      isFindingMeNow: false,
      isLoggedIn,
      token: isLoggedIn ? auth.token : newToken(),
      user: me,
    });
  };

  return {
    findMe,
  };
};
