import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Center,
  MenuDivider,
  useColorMode,
} from "@chakra-ui/react";
import {
  IoLogOut,
  IoLogoGithub,
  IoSunny,
  IoMoon,
  IoBug,
  IoInformationCircle,
} from "react-icons/io5";
import { FC, useContext } from "react";
import { useUserInfo } from "lib/clientFetchResources";
import { SettingsContext } from "./contexts";
import Link from "next/link";
import { AboutButton } from "./about";

export const AvatarMenu: FC<{
  toggleDebugChange: (debug: boolean) => void;
  version: { hash: string | null; date: string };
}> = ({ version, toggleDebugChange }) => {
  const { res } = useUserInfo();
  const { colorMode, toggleColorMode } = useColorMode();
  const { debug } = useContext(SettingsContext);

  return (
    <Menu>
      <MenuButton>
        {res ? (
          <Avatar
            name={`${res.data.givenName} ${res.data.surname}`}
            w="2.5rem"
            h="2.5rem"
          />
        ) : (
          <Center w="2.5rem" h="2.5rem">
            <Spinner w="1.5rem" h="1.5rem" />
          </Center>
        )}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={toggleColorMode}>
          {colorMode === "light" ? (
            <IoMoon
              style={{
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
          ) : (
            <IoSunny style={{ fontSize: "1.2rem", marginRight: "10px" }} />
          )}
          <span>{colorMode === "light" ? "Dark Mode" : "Light Mode"}</span>
        </MenuItem>
        <MenuItem onClick={() => toggleDebugChange(!debug)}>
          <IoBug
            style={{
              fontSize: "1.2rem",
              marginRight: "10px",
            }}
          />
          <span>{debug ? "Disable" : "Enable"} Debug Mode</span>
        </MenuItem>
        <Link href="/api/auth/logout" passHref>
          <MenuItem>
            <IoLogOut
              style={{
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
            <span>Log Out</span>
          </MenuItem>
        </Link>
        <MenuDivider />
        <AboutButton version={version} />
        <a href="https://www.github.com/neelkarma/yasspa">
          <MenuItem>
            <IoLogoGithub
              style={{
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
            <span>Source</span>
          </MenuItem>
        </a>
      </MenuList>
    </Menu>
  );
};
