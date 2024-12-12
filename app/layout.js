import "./globals.css";
import { AuthUserProvider } from "./context/AuthUserContext";
import Header from "./components/Header";

export const metadata = {
  title: "Hobbying",
  description: "A website for creatives",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Ribeye&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthUserProvider>
          <Header />
          <main> {children} </main>
        </AuthUserProvider>
      </body>
    </html>
  );
}
