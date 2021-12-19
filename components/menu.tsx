import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { IoPerson, IoLogOut } from "react-icons/io5";
import { FC } from "react";
import { useUserInfo } from "lib/clientFetchResources";

export const AvatarMenu: FC<{}> = () => {
  const { res, error } = useUserInfo();

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
        <MenuItem>
          <IoPerson
            style={{
              fontSize: "1.2rem",
              marginRight: "10px",
            }}
          />
          <span>Profile</span>
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
      </MenuList>
    </Menu>
  );
};
