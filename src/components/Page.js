import { useParams } from "react-router-dom";

import usePage from "../hooks/usePage";
import useTitle from "../hooks/useTitle";

export default function Page() {
  const { id } = useParams();
  const { page, meta } = usePage(id);
  useTitle(meta.title);
  return page;
}
