import { MantineProvider } from '@mantine/core';
import './globals.css';
import QueryProvider from './QueryProvider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <QueryProvider>
                    <MantineProvider>{children}</MantineProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
