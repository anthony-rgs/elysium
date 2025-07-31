type Props = {
  seconds: number;
};

export const formatDuration = ({ seconds }: Props): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [];

  if (hours > 0) formattedTime.push(`${hours} hr`);
  if (minutes > 0 || hours === 0) formattedTime.push(`${minutes} mins`);
  if (hours === 0 && remainingSeconds > 0)
    formattedTime.push(`${remainingSeconds} sec`);

  return formattedTime.join(" ");
};
