import { setPageTitle } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(""));
  }, []);

  return <div>Home</div>;
}
