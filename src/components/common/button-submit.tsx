import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type props = {
  isPending: boolean;
  title?: string;
  className?: string;
};
export default function ButtonSubmit({
  isPending,
  title = "Save",
  className,
}: props) {
  return (
    <Button type="submit" disabled={isPending} className={className}>
      {isPending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        title
      )}
    </Button>
  );
}
