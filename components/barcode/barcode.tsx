import { Spinner } from "@chakra-ui/react";
import { CenterCard, Card } from "components/card";
import { SettingsContext } from "components/settingscontext";
import JsBarcode from "jsbarcode";
import { useUserInfo } from "lib/clientFetchResources";
import { useContext, useEffect } from "react";

export const Barcode: React.FC<{}> = () => {
  const { res } = useUserInfo();
  const { debug } = useContext(SettingsContext);

  useEffect(() => {
    if (res) JsBarcode("#barcode", res.data.studentId);
  }, [res]);

  if (!res)
    return (
      <CenterCard>
        <Spinner />
      </CenterCard>
    );

  if (debug) console.log("profile user data", res);

  return (
    <Card>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="barcode" alt={`Student ID Barcode for ${res.data.studentId}`} />
    </Card>
  );
};
