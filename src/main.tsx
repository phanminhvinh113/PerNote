import ReactDOM from "react-dom/client";
import { Profiler } from "react";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import theme from "./theme.ts";

function onRender(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _phase: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _actualDuration: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _baseDuration: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _startTime: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _commitTime: number
) {
  // Add your profiling logic here if needed
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Profiler id="App" onRender={onRender}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </Profiler>
);
