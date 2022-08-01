import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSun, FaMoon } from "react-icons/fa";
import { Menu, Divider } from "@mantine/core";

import { ThemeContext, TokenContext } from "../utils/context";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useContext(ThemeContext);
  const { token, setToken } = useContext(TokenContext);

  const handleTheme = (mode) => {
    setTheme(mode);
  };

  const handleLogout = () => {
    setToken("0");
    localStorage.removeItem("token");
    router.push("/login");
    alert("You have been logged out");
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between">
      <Link id="to-homepage" className="text-white font-bold" href="/">
        Homepage
      </Link>
      <Menu className="bg-white rounded-full">
        {token !== "0" && (
          <Menu.Item id="to-profile" onClick={() => router.push("/profile")}>
            Profile
          </Menu.Item>
        )}
        <Menu.Item
          id="btn-mode"
          onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
          rightSection={theme === "dark" ? <FaSun /> : <FaMoon />}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Menu.Item>

        {token !== "0" && (
          <>
            <Divider />

            <Menu.Item
              id="btn-logout"
              color="red"
              onClick={() => handleLogout()}
            >
              Logout
            </Menu.Item>
          </>
        )}
      </Menu>
    </nav>
  );
};

export default Header;
