import { useState, useEffect } from "react";
import axios from "axios";

const AppBar = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchName = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName(response.data.firstName);
    };
    fetchName();
  }, []);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {name ? name[0].toUpperCase() : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
