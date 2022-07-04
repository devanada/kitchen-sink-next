import { useState, useMemo, useEffect } from "react";
import { Provider } from "react-redux";
import { wrapper, store } from "../utils/redux/store/store";
import { ThemeContext, TokenContext } from "../utils/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [token, setToken] = useState(null);
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const getToken = localStorage.getItem("token") || "0";
    setToken(getToken);
  }, [token]);

  if (token) {
    return (
      <Provider store={store}>
        <TokenContext.Provider value={jwtToken}>
          <ThemeContext.Provider value={background}>
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </TokenContext.Provider>
      </Provider>
    );
  }
}

export default wrapper.withRedux(MyApp);
