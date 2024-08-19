import { ServerList } from "@/app/ui/server-list";

export default async function Home() {
  const server = await fetch('https://api.turkb.us/v2/server', {
    next: { revalidate: 30 },
  }).then((res) => res.json());

  return (
    <div className="font-sans flex-1 w-full flex flex-col items-center p-8 pb-20 sm:p-20 gap-5 lg:px-60">
      <ServerList fallback={server} />
    </div>
  );
}
