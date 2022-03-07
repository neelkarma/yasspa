import {
  Spinner,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CenterCard, Card } from "components/card";
import { SettingsContext } from "components/contexts";
import JsBarcode from "jsbarcode";
import { useUserInfo } from "lib/clientFetchResources";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { IoSave } from "react-icons/io5";

export const Barcode: React.FC = memo(() => {
  const { res } = useUserInfo();
  const barcRef = useRef<HTMLCanvasElement>(null);
  const [barcHeight, setBarcHeight] = useState(100);
  const { debug } = useContext(SettingsContext);

  useEffect(() => {
    if (res)
      JsBarcode(barcRef.current, res.data.studentId, { displayValue: false });
  }, [res]);

  const handleSaveClick = useCallback(() => {
    const anchor = document.createElement("a");
    anchor.href = barcRef.current!.toDataURL();
    anchor.download = `${res.data.studentId}-barcode`;
    anchor.click();
    setTimeout(() => {
      anchor.remove();
    }, 0);
  }, [res?.data.studentId]);

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  if (debug) console.log("profile user data", res);

  return (
    <Card>
      <HStack gap={1} w="100%">
        <IconButton
          aria-label="Download Barcode"
          icon={<IoSave />}
          onClick={handleSaveClick}
        />
        <Slider
          aria-label="Set Barcode Size"
          min={10}
          max={100}
          defaultValue={100}
          onChange={setBarcHeight}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
      <Center h="80%">
        <canvas
          ref={barcRef}
          style={{ height: `${barcHeight}%`, maxWidth: "100%" }}
        />
      </Center>
    </Card>
  );
});
