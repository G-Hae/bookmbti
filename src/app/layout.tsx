import { MantineProvider } from '@mantine/core';

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
