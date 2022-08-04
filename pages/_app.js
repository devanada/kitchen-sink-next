import { NotificationsProvider } from "@mantine/notifications";
import { useState, useMemo, useEffect } from "react";
import { getCookie } from "cookies-next";
import { Provider } from "react-redux";

import { wrapper, store } from "../utils/redux/store/store";
import { ThemeContext } from "../utils/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(getCookie("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <NotificationsProvider>
      <Provider store={store}>
        <ThemeContext.Provider value={background}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </Provider>
    </NotificationsProvider>
  );
}

export default wrapper.withRedux(MyApp);
