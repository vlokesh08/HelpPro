import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Author {
  email: string;
  fullName: string;
  pic: string;
  username: string;
  _id: string;
}

interface PostData {
  title?: string;
  body?: string;
  pics?: string[];
  bounty?: string[];
  author?: Author;
  likes?: string[];
  comments?: string[];
  techstack?: string[];
  links?: string[];
}

const DetailPost = () => {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [data, setData] = useState<PostData>({});
  const temp = localStorage.getItem("userInfo");
  const localUser = JSON.parse(temp as string); // Add type assertion here
  const UserId = localUser._id;
  const { id } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [saved, setSaved] = useState(false);

  const handleEdit = () => {
    navigate(`/editPost/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${backendURL}/api/posts/getpostbyid/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.savedBy.length > 0) {
          setSaved(true);
        }
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = (e: any) => {
    console.log("user token", user.token);
    e.preventDefault();
    axios
      .post(
        `${backendURL}/api/posts/savepost/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.message == "Saved") {
          toast.success("Post Saved Successfully");
          setSaved(true);
        } else if (res.data.message === "UnSaved") {
          toast.success("Post UnSaved Successfully");
          setSaved(false);
        }
      })
      .catch((err: any) => {
        console.log("err", err);
        toast.error(err.response.data.message);
        setSaved(false);
      });
  };

  return (
    <div>
      <div className="bg-white ">
        <div className="pt-6  ">
          <div className="mx-auto  max-w-2xl px-4 pb-5 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-5 lg:pt-4">
            <div className="px-2 flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src={data.author?.pic || "https://i.pravatar.cc/300"}
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {data.author?.fullName || "John Doe"}
                </h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">
                  {data.author?.username || "JohnDoe"}{" "}
                </p>
              </div>
            </div>
            </div>
          

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-12 lg:pt-5">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              {/* <h2 className="sr-only">Bounty</h2> */}
              <h1>Bounty</h1>
              <p className="text-3xl tracking-tight text-gray-900">
                {data &&
                  data.bounty &&
                  data.bounty.length > 1 &&
                  data.bounty[0]}{" "}
                -{" "}
                {data &&
                  data.bounty &&
                  data.bounty.length > 1 &&
                  data.bounty[1]}
              </p>

              <form className="mt-10">
                <div>
                  <div className="flex flex-row gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-heart"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <h3>
                      {(data &&
                        data.likes &&
                        data.likes.length > 1 &&
                        data.likes.length) ||
                        0}{" "}
                      Likes
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-message-circle"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    <h3>
                      {(data &&
                        data.comments &&
                        data.comments.length > 1 &&
                        data.comments.length) ||
                        0}{" "}
                      Comments
                    </h3>
                  </div>
                </div>

                <div className="mt-10">
                  {UserId === data.author && (
                    <button
                      type="submit"
                      onClick={handleEdit}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Edit Post
                    </button>
                  )}
                </div>

                <div className="mt-10">
                  {UserId !== data.author && (
                    <a href={`/chats/${data.author}`}>
                      <button
                        type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Chat
                      </button>
                    </a>
                  )}
                </div>
                <div className="flex space-x-5">
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Contribute
                  </button>
                  {saved ? (
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleSave}
                    >
                      Unsave Post
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={handleSave}
                    >
                      Save for later
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data.body || null}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {data &&
                      data.bounty &&
                      data.bounty.length > 0 &&
                      data.techstack?.map((tech: any) => {
                        return (
                          <li key={tech} className="text-gray-400">
                            <span className="text-gray-600">{tech}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                {data && data.links && (
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Links</h2>

                    <div className="mt-4 space-y-6">
                      {data.links.map((link: any) => {
                        return (
                          <div key={link}>
                            <a
                              href={link}
                              className="text-indigo-600 hover:text-indigo-500"
                            >
                              {link}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className=" flex flex-row aspect-h-4 aspect-w-3 rounded-lg lg:block">
              {data &&
                data.pics &&
                data.pics.length > 0 &&
                data.pics.map((pic: any) => {
                  return (
                    <div className="flex">
                      <img
                        src={pic}
                        alt="Post Pics"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  );
                })}
              {/* <img
                src={data && data.pics[0]}
                alt="Two each of gray, white, and black shirts laying flat."
                className="h-full w-full object-cover object-center"
              /> */}
            </div>
          </div>
            </div>
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
