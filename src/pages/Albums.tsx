import { setPageTitle } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Albums() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Albums"));
  }, []);

  return <div>Albums</div>;
}
