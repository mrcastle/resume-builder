import {
  ErrorFallbackProps,
  ErrorComponent,
  ErrorBoundary,
  AppProps,
} from "@blitzjs/next";
import { AuthenticationError, AuthorizationError } from "blitz";

import { withBlitz } from "app/blitz-client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "../styles/global.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default withBlitz(MyApp);
