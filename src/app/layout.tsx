import { MantineProvider } from '@mantine/core';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <MantineProvider>{children}</MantineProvider>
            </body>
        </html>
    );
}
