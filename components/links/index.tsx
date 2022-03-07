import {
  Text,
  SimpleGrid,
  GridItem,
  VStack,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { Card } from "components/card";
import { useCardHoverColor } from "lib/theme";
import { FC, memo } from "react";
import { IconType } from "react-icons";
import {
  IoDocument,
  IoPaperPlane,
  IoPersonCircle,
  IoSchool,
  IoTv,
} from "react-icons/io5";

const GridLink: FC<{ icon: IconType; href: string; label: string }> = ({
  icon: Icon,
  href,
  label,
}) => {
  const hoverColor = useCardHoverColor();
  return (
    <GridItem
      borderRadius={5}
      _hover={{ backgroundColor: hoverColor }}
      transitionTimingFunction="ease-out"
      transitionDuration="100ms"
      minW="full"
    >
      <LinkBox p={3}>
        <LinkOverlay href={href} target="_blank" rel="noreferrer">
          <VStack>
            <Icon style={{ fontSize: "3rem" }} />
            <Text textAlign="center">{label}</Text>
          </VStack>
        </LinkOverlay>
      </LinkBox>
    </GridItem>
  );
};

export const Links: FC = memo(() => {
  return (
    <Card>
      <SimpleGrid columns={3} justifyItems="center">
        <GridLink
          label="SBHS Website"
          href="https://www.sydneyboyshigh.com/"
          icon={IoSchool}
        />
        <GridLink
          label="Student Portal"
          href="https://portal.sbhs.net.au/"
          icon={IoPersonCircle}
        />
        <GridLink
          label="Canvas"
          href="https://sydneyboyshigh.instructure.com/"
          icon={IoPaperPlane}
        />
        <GridLink
          label="Google Docs"
          href="https://docs.google.com/"
          icon={IoDocument}
        />
        <GridLink
          label="ClickView"
          href="https://online.clickview.com.au/"
          icon={IoTv}
        />
      </SimpleGrid>
    </Card>
  );
});
