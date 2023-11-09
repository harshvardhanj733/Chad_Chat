import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const token =
  "007eJxTYNBdslHaax37okXyW3defMHPWHopcM7cGwd2Lbo1dfOjq5WHFRgSLZIsjIwskpMMLMxNTM0TEy1NTIzSLA2NUxNNDNMS04qv+KQ2BDIybPoWzsrIAIEgPgtDbmJmHgMDAP1eImE=";
const appId = "a8b8228cb087457aa9442f913ea41faf";
export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: token,
  name: "PRanay",
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
