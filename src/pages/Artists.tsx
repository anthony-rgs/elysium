import { setPageTitle } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Artists() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Artists"));
  }, []);
  return <div>Artists</div>;
}
