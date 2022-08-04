import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { FaSun, FaMoon, FaEllipsisH } from "react-icons/fa";
import { Menu, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";

import { ThemeContext } from "../utils/context";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const token = getCookie("token");
  const router = useRouter();

  const handleTheme = (mode) => {
    setTheme(mode);
    setCookie("theme", mode);
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
    alert("You have been logged out");
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between items-center">
      <Link href="/">
        <a id="to-homepage" className="text-white font-bold">
          Homepage
        </a>
      </Link>
      <Menu id="toggle-menu" position="bottom-start" shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <FaEllipsisH className="text-xl text-white" />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {token && (
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
          <Menu.Divider />
          {token ? (
            <Menu.Item
              id="btn-logout"
              color="red"
              onClick={() => handleLogout()}
            >
              Logout
            </Menu.Item>
          ) : (
            <Menu.Item
              id="btn-logout"
              color="blue"
              onClick={() => router.push("/login")}
            >
              login
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
}
