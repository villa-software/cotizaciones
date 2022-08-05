import type { NextPage } from "next";
import { ApiResponse, Quote, City } from "src/types";
import HomePage from "../components/Home";

export async function getServerSideProps() {
  const jsonData = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://cotizacionespy.vercel.app/api/quotes"
      : "http://localhost:3001/api/quotes"
  );

  const data: ApiResponse = await jsonData.json();

  const jsonCities = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://cotizacionespy.vercel.app/api/cities"
      : "http://localhost:3001/api/cities"
  );

  const cities = await jsonCities.json();

  return {
    props: {
      data: [...data.data],
      cities: cities.data.cities,
      defaultCity: cities.data.defaultCity,
    },
  };
}
interface Props {
  data: Quote[];
  cities: City[];
  defaultCity: City;
}

const Home: NextPage<Props> = (props) => {
  return <HomePage language="es" {...props} />;
};

export default Home;
