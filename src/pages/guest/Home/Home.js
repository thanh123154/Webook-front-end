import SearchBar from "../../../components/SearchBar/SearchBar";
import home from "./home.module.scss";

export default function Home() {
  return (
    <div className={home["container"]}>
      <SearchBar />
    </div>
  );
}
