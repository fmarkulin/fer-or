import readme from "@/lib/readme";
import ReadmeEntry from "./ReadmeEntry";

export default function Readme() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {readme.map((entry) => (
        <ReadmeEntry key={entry.title} readme={entry} />
      ))}
    </div>
  );
}
