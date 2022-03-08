const url = "https://we-book-back-end.herokuapp.com";
// const url = "http://localhost:5000";

const apis = {
  // api xác thực
  LOGIN: url + "/auth/login",
  SIGNUP: url + "/auth/signup",
  TOKEN: url + "/auth/token",

  // api tài khoản người dùng
  USER: url + "/user",

  // api nơi ở
  LISTING_GUEST: url + "/listing",
  LISTING_HOST: url + "/listing/host",
  PLACE: url + "/listing/place",
  AMENITY: url + "/listing/amenity",

  // api book
  BOOKING: url + "/booking",

  //api chuyen di
  TRIPS_GUEST_UPCOMING: url + "/transaction/guest/upcoming",
  TRIPS_GUEST_PAST: url + "/transaction/guest/past",
  TRANSACTIONS_HOST_UPCOMING: url + "/transaction/host/upcoming",
  TRANSACTIONS_HOST_PAST: url + "/transaction/host/past",
  TRANSACTIONS_HOST_CURRENT: url + "/transaction/host/current",
  UPDATE_PAST_TRIP: url + "/transaction/guest/update/",
};

export default apis;
