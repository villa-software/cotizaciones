import type { NextPage } from "next";

import HomePage from "../components/Home";


export async function getServerSideProps() {
  const jsonData = await fetch('http://localhost:3000/api/quotes');
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
