import type { NextPage } from "next";
import { ApiResponse, Quote } from "src/types";
import HomePage from "../components/Home";

export async function getServerSideProps() {
  const jsonData = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://cotizacionespy.vercel.app/api/quotes"
      : "http://localhost:3000/api/quotes"
  );

  const data: ApiResponse = await jsonData.json();

  const jsonCities = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://cotizacionespy.vercel.app/api/cities"
      : "http://localhost:3000/api/cities"
  );

  console.log({ jsonCities });

  const cities = await jsonCities.json();

  return {
    props: {
      data: [...data.data],
      cities: [],
    },
  };
}
interface Props {
  data: Quote[];
  cities: any;
}

const Home: NextPage<Props> = (props) => {
  console.log(props.data);
  return <HomePage language="es" data={props.data} cities={props.cities} />;
};

export default Home;
