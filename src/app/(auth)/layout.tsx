export default function authLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className='h-screen'>{children}</div>
}