import Image from "next/image";
import Login from "../src/pages/login/page"
import Menu from "../src/components/menu/page";

export default function Home() {

  return (
    <div>
        <Menu /> 
     
      <Login />

    </div>
  );
}
