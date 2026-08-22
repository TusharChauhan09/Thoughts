export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pt-5 pb-40">
            <h1>Blog</h1>
            {children}
        </div>
    )
}