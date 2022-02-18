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

  return {
    props: {
      data: [...data.data],
    },
  };
}
interface Props {
  data: Quote[];
}

const Home: NextPage<Props> = (props) => {
  console.log(props.data);
  return <HomePage language="es" data={props.data} />;
};

export default Home;
