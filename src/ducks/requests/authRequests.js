import apis from "../../constants/apis";
import {
  requestGet,
  requestPatch,
  requestPost,
} from "../../helpers/requestHandler";

export const requestDoLogin = (dataRequest) => {
  const headers = {};
  return requestPost(apis.LOGIN, dataRequest, headers);
};

export const requestDoSignup = (dataRequest) => {
  const headers = {};
  return requestPost(apis.SIGNUP, dataRequest, headers);
};

export const requestRefreshToken = (dataRequest) => {
  const headers = {};
  return requestPost(apis.TOKEN, dataRequest, headers);
};

export const requestDoGetUser = () => {
  return requestGet(apis.USER);
};

export const requestDoEditUser = (dataRequest) => {
  return requestPatch(apis.USER, dataRequest);
};
