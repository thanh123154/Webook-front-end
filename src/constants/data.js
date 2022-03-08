import { MainBg } from "../assets/images";

export const listingListSample = [
  ...Array.apply(null, Array(5)).map((_, i) => ({
    id: i,
    name: `Căn hộ số ${i + 1}`,
    type: "Studio",
    thumbnail: MainBg,
    price: 100000,
    reviews: [
      ...Array.apply(null, Array(25)).map((_, j) => ({
        id: j,
        user: "Bùi Thị D",
        rating: 5,
        review:
          "Nhà này rất sạch, dịch vụ chu đáo, chủ nhà dễ mến. Cực recommend mọi người hãy đến đây.",
      })),
    ],
  })),
];
