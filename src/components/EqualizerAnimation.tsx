export default function EqualizerAnimation() {
  const delays = [
    "[animation-delay:0ms]",
    "[animation-delay:450ms]",
    "[animation-delay:300ms]",
    "[animation-delay:150ms]",
  ];

  return (
    <div className="flex justify-center items-end gap-0.5 h-4 w-6">
      {delays.map((delay, i) => (
        <span
          key={i}
          className={`w-0.5 bg-green [animation:equalizer_1s_infinite_ease-in-out] ${delay}`}
        />
      ))}
    </div>
  );
}
