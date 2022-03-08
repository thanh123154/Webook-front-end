import { apis } from "../../constants";
import {
  requestGet,
  requestPatch,
  requestPost,
} from "../../helpers/requestHandler";

export const requestDoGetPlace = () => {
  const headers = {};
  return requestGet(apis.PLACE, headers);
};

export const requestDoGetAmenity = () => {
  const headers = {};
  return requestGet(apis.AMENITY, headers);
};

export const requestDoGetAllListingsByHost = () => {
  return requestGet(apis.LISTING_HOST);
};

export const requestDoCreateNewListingByHost = () => {
  return requestPost(apis.LISTING_HOST);
};

export const requestDoEditListingByHost = (dataRequest) => {
  return requestPatch(apis.LISTING_HOST + `/${dataRequest.id}`);
};
