'use client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Multi Lives - Assista múltiplas lives ao mesmo tempo</title>
        <meta
          name="description"
          content="Assista múltiplas lives simultaneamente. Platform para criar e compartilhar salas com seus amigos."
        />
      </head>
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
