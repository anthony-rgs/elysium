import { Album, Albums, Artist, Artists, Home, NotFound, Songs } from "@/pages";

type Props = {
  path: string;
  element: React.ReactNode;
};

export const routes: Props[] = [
  { path: "/", element: <Home /> },
  { path: "/albums", element: <Albums /> },
  { path: "/albums/:id", element: <Album /> },
  { path: "/artists", element: <Artists /> },
  { path: "/artists/:id", element: <Artist /> },
  { path: "/songs", element: <Songs /> },
  { path: "*", element: <NotFound /> },
];
