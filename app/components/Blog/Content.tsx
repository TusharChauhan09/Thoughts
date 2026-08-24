import ReactMarkdown, { defaultUrlTransform } from "react-markdown";

function urlTransform(url: string) {
  if (url.startsWith("data:image/")) return url;
  return defaultUrlTransform(url);
}

export default function Content({ description }: { description: string }) {
  return (
    <div className="prose dark:prose-invert text-lg text-muted-foreground">
      <ReactMarkdown
        urlTransform={urlTransform}
        components={{
          img: ({ src, alt }) => (
            <img src={src} alt={alt ?? ""} className="my-4 max-w-full rounded-xl" />
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
}
