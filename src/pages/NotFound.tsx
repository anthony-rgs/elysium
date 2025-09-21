import { PageError } from "@/components";

export default function NotFound() {
  return (
    <PageError
      title="Page not found"
      subtitle="We can’t seem to find the page you are looking for."
      buttonLabel="Home"
      buttonLinkTo="/"
    />
  );
}
