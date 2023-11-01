import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const token =
  "007eJxTYNDxUDEtEnD9fzB98uu+z/mr1j3WZDXfZFbquYXrEfv30AUKDIkWSRZGRhbJSQYW5iam5omJliYmRmmWhsapiSaGaYlpl1WcUhsCGRkec0UxMjJAIIjPwpCbmJnHwAAA/cMePQ==";
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
