import {
  SingleAlbum,
  Albums,
  SingleArtist,
  Artists,
  Home,
  NotFound,
  Songs,
} from "@/pages";

type Props = {
  path: string;
  element: React.ReactNode;
};

export const routes: Props[] = [
  { path: "/", element: <Home /> },
  { path: "/albums", element: <Albums /> },
  { path: "/albums/:id", element: <SingleAlbum /> },
  { path: "/artists", element: <Artists /> },
  { path: "/artists/:id", element: <SingleArtist /> },
  { path: "/songs", element: <Songs /> },
  { path: "*", element: <NotFound /> },
];
