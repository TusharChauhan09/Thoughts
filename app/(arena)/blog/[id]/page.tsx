import BackButton from "@/app/components/Blog/BackButton";
import Banner from "@/app/components/Blog/Banner";
import ReadTime from "@/app/components/Blog/ReadTime";

export default async function Blog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div className="flex flex-col justify-center gap-3">
      <BackButton />
      <ReadTime time={10} className="flex justify-center" />
      <Banner/>
      
    </div>;
}
