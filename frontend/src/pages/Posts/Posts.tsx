import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";
import { Button } from "@/components/ui/button";
const Posts = () => {
  const [data, setData] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  React.useEffect(() => {
    axios
      .get(`${backendURL}/api/posts/getpostforprofile/${user.username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (data.length === 0)
    return (
      <div className="mt-12 max-w-2xl rounded-3xl ring-1 ring-gray-700 sm:mt-12 lg:mx-0 lg:flex lg:max-w-none p-8 mb-6 flex justify-center">
        <div className="flex flex-col justify-center text-center gap-3">
          <h1>You have no Posts!</h1>
          <a href="/addnewpost">
            <Button className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full">
              Need Help
            </Button>
          </a>
        </div>
      </div>
    );
  return (
    <div>
      {data.map((post: any) => {
        return (
          <div
            key={post._id}
            className="mt-5 max-w-2xl rounded-3xl ring-1 ring-gray-700 sm:mt-5 lg:mx-0 lg:flex lg:max-w-none p-4 mb-6"
          >
            <EditPost post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
