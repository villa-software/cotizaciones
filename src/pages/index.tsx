import type { NextPage } from "next";
import HomePage from "../components/Home";


export async function getServerSideProps() {
  const jsonData = await fetch(process.env.NODE_ENV === 'production' ? 'https://cotizacionespy.vercel.app/api/quotes' : 'http://localhost:3000/api/quotes');
  const data = await jsonData.json();

  return {
    props: {
      data,
    }
  };
}

const Home: NextPage = (props) => {
  return <HomePage language="es" data={props.data} />;
};

export default Home;
