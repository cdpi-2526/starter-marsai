import Button from "../../components/Button";
import "./Home.css";
import { useOutletContext } from "react-router";

function Home() {
  const { t } = useOutletContext();
  return <>{t("title")}</>;
}

export default Home;
