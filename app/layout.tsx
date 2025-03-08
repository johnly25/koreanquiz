import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import '../styles/globals.css'
import { HeaderSearch } from '@/components/Navbar/NavBar'


// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';


export const metadata = {
    title: 'My Mantine app',
    description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider defaultColorScheme="dark">
                    <HeaderSearch />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}