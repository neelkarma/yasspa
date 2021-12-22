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
import { IoLogOut, IoLogoGithub, IoSunny, IoMoon } from "react-icons/io5";
import { FC } from "react";
import { useUserInfo } from "lib/clientFetchResources";

export const AvatarMenu: FC<{}> = () => {
  const { res, error } = useUserInfo();
  const { colorMode, toggleColorMode } = useColorMode();

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
        {/* eslint-disable-next-line */}
        <a href="/api/auth/logout">
          <MenuItem>
            <IoLogOut
              style={{
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
            <span>Log Out</span>
          </MenuItem>
        </a>
        <MenuDivider />
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
