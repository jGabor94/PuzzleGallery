import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ConfigProvider from "./_providers/ConfigProvider/ConfigProvider";
import { CssBaseline } from "@mui/material";
import MenuBar from "@/components/menuBar/MenuBar";
import { NextAuthProvider, PaginationProvider, RootThemeProvider } from './_providers/providers';


export const metadata = {
  title: "Gyöngykirakó képek",
  description: "Személyes galléria az elkészült művekről",
  creator: 'Jakucs Gábor',
  keywords: ['Diamond', 'Puzzle', 'Gallery'],
  referrer: 'no-referrer',
  icons: {
    icon: '/icons/favicon.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <ConfigProvider>
          <RootThemeProvider>
            <body>
              <AppRouterCacheProvider>
                <PaginationProvider>
                  <CssBaseline />
                  <MenuBar height={70} />
                  {children}
                </PaginationProvider>
              </AppRouterCacheProvider>
            </body>
          </RootThemeProvider>
        </ConfigProvider>
      </NextAuthProvider>

    </html>
  );
}
