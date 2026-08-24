import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import rehypeRaw from "rehype-raw";

function urlTransform(url: string) {
  if (url.startsWith("data:image/")) return url;
  return defaultUrlTransform(url);
}

export default function Content({ description }: { description: string }) {
  return (
    <div className="prose dark:prose-invert text-lg text-muted-foreground">
      <ReactMarkdown
        urlTransform={urlTransform}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt, width, height }) => (
            <img
              src={src}
              alt={alt ?? ""}
              width={width}
              height={height}
              style={width ? { width: Number(width), height: "auto" } : undefined}
              className="my-4 max-w-full rounded-xl"
            />
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
}
