import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/Container";
import { cookies } from "next/headers";
import { AUTHORIZATION_COOKIE_KEY } from "./api.service";
import { decode } from "jsonwebtoken";
import { User } from "./types";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get(AUTHORIZATION_COOKIE_KEY);
  const userInfo: User | null = token?.value
    ? (decode(token.value) as User)
    : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {userInfo ? <Header role={userInfo.role} /> : null}
          <Container children={children} />
        </main>
      </body>
    </html>
  );
}
