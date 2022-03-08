import results from "./results.module.scss";
import { apis, paths, searchKeys } from "../../../constants";
import { useQuery } from "../../../hooks";
import FilterBar from "./components/FilterBar/FilterBar";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { requestPost } from "../../../helpers/requestHandler";
import { Col, Row, Skeleton } from "antd";
import PaginationBar from "./components/PaginationBar/PaginationBar";
import ListingCard from "../components/ListingCard/ListingCard";

export default function Results() {
  const query = useQuery();
  const history = useHistory();

  const destination = query.get(searchKeys.DESTINATION);
  const checkin = query.get(searchKeys.CHECKIN);
  const checkout = query.get(searchKeys.CHECKOUT);
  const guests = query.get(searchKeys.GUESTS);

  const [totalResult, setTotalResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [listingList, setListingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    price: { min: "", max: "" },
    places: [],
    amenities: [],
  });

  const apiGetResult = useCallback(
    async (page = 1) => {
      setIsLoading(true);

      if (!destination || destination === "") history.push(paths.HOME);
      else {
        try {
          const dataReq = {
            destination,
            checkin,
            checkout,
            guests,
            page: page,
            ...filterData,
          };

          const res = await requestPost(apis.LISTING_GUEST, dataReq);
          const dataRes = res.data;

          if (dataRes.status) {
            setListingList(dataRes.result);
            setCurrentPage(dataRes.current_page);
            setTotalPage(dataRes.total_page);
            setTotalResult(dataRes.total_result);
          }

          setIsLoading(false);
        } catch (error) {
          console.log("get search result error", error);
        }
      }
    },
    [checkin, checkout, destination, filterData, guests, history]
  );

  useEffect(() => {
    apiGetResult();
  }, [apiGetResult]);

  return !isLoading ? (
    <div className={results["container"]}>
      <div className="list">
        <p>{totalResult} chỗ ở</p>

        <h1>Chỗ ở tại {destination}</h1>

        <FilterBar filterData={filterData} setFilterData={setFilterData} />

        <br />

        <Row gutter={[20, 20]}>
          {listingList.map((listing) => (
            <Col span={8} key={listing.id}>
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>

        {!isLoading && (
          <PaginationBar
            currentPage={currentPage}
            totalPage={totalPage}
            onNext={() => apiGetResult(currentPage + 1)}
            onPrev={() => apiGetResult(currentPage - 1)}
            onNum={(page) => apiGetResult(page)}
          />
        )}
      </div>
    </div>
  ) : (
    <div className={results["container-preview"]}>
      <Skeleton.Button active shape="round" className={results["sub-title"]} />
      <Skeleton.Button
        active
        shape="round"
        size="large"
        className={results["title"]}
      />

      <Row>
        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />

        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />

        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={results["btn"]}
        />
      </Row>

      <Row className={results["gallery"]} wrap={false} gutter={20}>
        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>

        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>

        <Col span={8}>
          <Skeleton.Button
            active
            shape="round"
            className={results["card-image"]}
          />
          <Skeleton active round />
        </Col>
      </Row>
    </div>
  );
}
