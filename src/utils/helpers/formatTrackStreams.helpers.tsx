type Props = {
  streams: number;
};

export const formatTrackStreams = ({ streams }: Props): string => {
  return streams.toLocaleString("en-US");
};
