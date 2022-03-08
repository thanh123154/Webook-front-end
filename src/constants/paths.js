const hosting = "/hosting";

const paths = {
  // Common
  AUTH: "/auth",
  NOT_FOUND: "/404",

  // Guest
  HOME: "/",
  RESULTS: "/results",
  LISTING_VIEW_wId: "/listing/:id",
  LISTING_VIEW_nId: "/listing/",
  TRIPS: "/trips",
  FAV_LIST: "/favorite-list",
  ACCOUNT: "/account",
  PROFILE_VIEW_wId: "/profile-view/:id",
  PROFILE_VIEW_nId: "/profile-view/",

  // Host
  HOSTING: hosting,
  LISTINGS: hosting + "/listings",
  LISTING_EDIT_wId: hosting + "/listings/:id",
  LISTING_EDIT_nId: hosting + "/listings/",
  LISTING_NEW: hosting + "/listing-new",
  HISTORY: hosting + "/history",
  PROFILE: hosting + "/profile",
};

export default paths;
