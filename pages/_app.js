import "../src/styles/globals.scss";
import { ShowProvider } from "../contexts";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ShowProvider>
        <Component {...pageProps} />
      </ShowProvider>
    </>
  );
}

export default MyApp;
