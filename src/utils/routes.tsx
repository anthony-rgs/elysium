import { Album, Albums, Artist, Artists, Home, NotFound } from "@/pages";

export const routes: { path: string; element: React.ReactNode }[] = [
  { path: "/", element: <Home /> },
  { path: "/albums", element: <Albums /> },
  { path: "/albums/:id", element: <Album /> },
  { path: "/artists", element: <Artists /> },
  { path: "/artists/:id", element: <Artist /> },
  { path: "*", element: <NotFound /> },
];
