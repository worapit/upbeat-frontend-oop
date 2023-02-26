import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=U, initial-scale=1.0" />
        <title>UPBEAT GAME</title>
        <link
          href="https://fonts.googleapis.com/css?family=Bungee"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="home.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
