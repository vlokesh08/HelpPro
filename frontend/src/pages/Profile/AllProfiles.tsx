import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AllProfiles = () => {
  const [data, setData] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${backendURL}/api/profile/getAllProfiles`, {
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

  return (
    <div className="container">
      <ul role="list" className="divide-y divide-gray-100">
        {data.map((profile: any) => {
          return (
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={profile.pic}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {profile.username}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Co-Founder / CEO
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time>3h ago</time>
                </p>
              </div>
            </li>
          );
        })}
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Leslie Alexander
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                leslie.alexander@example.com
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AllProfiles;
