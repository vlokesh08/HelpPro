import React from "react";
import PostFilter from "./PostFilter";
import HomePageProfiles from "./HomePageProfiles";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function formatDate(dateString : string) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
      return "Invalid Date";
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}
const Post = ({ post }: any) => {
  return (
    <div className="">
      <div className="mx-auto mt-3 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-3 lg:mx-0 lg:flex lg:max-w-none">
        <div className="p-6 sm:p-8 lg:flex-auto">
          <div className="flex flex-row text-center gap-3 mb-2">
            <Avatar>
              <AvatarImage src={post.author.pic} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{post.author.firstName}</h1>
            <h2>{post.author.username}</h2>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-gray-900">
            {post.title}
          </h3>
          <p className="mt-2 text-base leading-6 text-gray-600">{post.body}</p>
          <div className="mt-3 flex items-center gap-x-2">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
              Tech Stack
            </h4>
            <div className="h-px flex-auto bg-gray-100"></div>
          </div>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-4"
          >
            {post?.techstack.map((tech: any) => {
              return (
                <li key={tech} className="flex items-center gap-x-1">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>{tech}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="-mt-1 p-1 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
          <div className="rounded-3xl bg-gray-50 py-6 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-8">
            <div className="mx-auto max-w-xs px-4">
              <p className="text-sm font-semibold text-gray-600">Bounty!!</p>
              <p className="mt-3 flex items-baseline justify-center gap-x-1">
                <span className="text-base font-bold tracking-tight text-gray-900">
                  {post.bounty[0]} - {post.bounty[1]}
                </span>
                <span className="text-xs font-semibold leading-6 tracking-wide text-gray-600">
                  USD
                </span>
              </p>
              <div className="flex justify-center items-center">
                <div className="flex justify-center align-middle ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                  style={{ verticalAlign: "middle", marginRight: "5px" }}
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                </div>
                <p className="mt-4 text-xs leading-5 text-gray-600 ">
                  {post.comments.length} Comments
                </p>
              </div>

              <a
                href={`/detailPost/${post._id}`}
                className="mt-5 block w-full rounded-md bg-indigo-600 px-2 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Know More
              </a>
              <h4 className="mt-3">End Date : { formatDate(post.date)} </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPostButton = () => {
  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center bg-white rounded-2xl ring-1 ring-gray-200 shadow-lg p-4 mb-4">
      <h3>Want Help with your Project?</h3>
      <a href="/addnewpost">
        <Button className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full h-1/2">
          Need Help
        </Button>
      </a>
    </div>
  );
};

const Instagram = () => {
  const [posts, setPosts] = React.useState([]);
  const user = useSelector((state: any) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  React.useEffect(() => {
    axios
      .get(`${backendURL}/api/posts/getallposts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // This will print the data from the API to the console
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-3">
          <PostFilter />
          {posts?.map((post: { id: string }) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div className="rounded-2xl ring-1 ring-gray-200 p-5 mt-4">
          <AddPostButton />
          <HomePageProfiles />
        </div>
      </div>
    </div>
  );
};

export default Instagram;
