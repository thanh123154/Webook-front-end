import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  requestDoGetPlace,
  requestDoGetAmenity,
} from "../requests/listingRequests";
import {
  doGetListing,
  listingFail,
  listingSuccess,
} from "../slices/listingSlice";

export function* watchDoListing() {
  yield takeLatest(doGetListing.type, handleGetListing);
}

export function* handleGetListing(action) {
  try {
    const responsePlace = yield call(() => requestDoGetPlace(action.payload));
    const responseAmenity = yield call(() =>
      requestDoGetAmenity(action.payload)
    );

    const resPlace = responsePlace.data;
    const resAmenity = responseAmenity.data;

    if (resPlace.status && resAmenity.status) {
      yield put(
        listingSuccess({
          isOk: true,
          place: resPlace.data,
          amenity: resAmenity.data,
        })
      );
    } else {
      yield put(
        listingFail({
          isOk: false,
        })
      );
    }
  } catch (error) {
    console.log("Get Place and Amenity Error", error);

    yield put(
      listingFail({
        isOk: false,
        message: error,
      })
    );
  }
}
