import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Toaster />
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
