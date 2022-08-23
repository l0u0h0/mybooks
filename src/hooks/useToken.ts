import { useSelector } from "react-redux";
import { RootState } from "../common/types";

export default function useToken() {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  return token;
}
