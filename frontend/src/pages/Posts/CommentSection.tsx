import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

const CommentSection = () => {
  const user = useSelector((state: any) => state.user);
  const temp = localStorage.getItem("userInfo");
  const localUser = JSON.parse(temp!) as { _id: string }; // Update the type of localUser
  const UserId = localUser._id;
  const [data, setData] = useState<string[]>([]);

  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [replyOpenIndex, setReplyOpenIndex] = useState(-1); // Initialize with -1 which means no comment's reply section is open
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleReply = (index: number) => {
    // Toggle reply section for the clicked comment index
    setReplyOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleClick = () => {
    axios
      .post(
        `${backendURL}/api/comments/addComment`,
        {
          postId: id,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setComment("");
        setData((prevData: any[]) => [...prevData, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteComment = (id : string ,index : number) => {
    axios
      .delete(`${backendURL}/api/comments/deleteComment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData((prevData: any[]) => prevData.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddReply = ( id: any ) => {
    if(!reply) return console.log("Reply cannot be empty");
    axios
      .post(
        `${backendURL}/api/comments/addReply`,
        {
          commentId: id,
          reply,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setReply("");
        setData((prevData: any[]) => {
          const newData = [...prevData];
          newData[replyOpenIndex].replies.push(response.data);
          return newData;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(`${backendURL}/api/comments/getComments/${id}`, config)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="m-8 ">
      <div className="w-full bg-white rounded-lg border p-1 md:p-3 m-5">
        <h3 className="font-semibold p-1">Discussion</h3>
        <div className="flex flex-col gap-5 m-3">
          <div>
            <div className="flex w-full justify-between border rounded-md">
              <div className="p-3 w-full">
                <div className="flex gap-3 items-center w-full">
                  <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-bold">
                    LALALA<br></br>
                    <span className="text-sm text-gray-400 font-normal">
                      Level 1
                    </span>
                  </h3>
                </div>
                <Input className="w-full" value={comment} onChange={(e)=>{setComment(e.target.value)}}></Input>
                <button
                  className="text-right text-blue-500"
                  onClick={handleClick}
                >
                  Comment
                </button>
              </div>
            </div>
            {data &&
              data.map((comment: any, index: number) => (
                <div key={index}>
                  <div className="flex w-full justify-between border rounded-md mt-3">
                    <div className="p-3">
                      <div className="flex gap-3 items-center">
                        <img
                          src={comment.postedBy.pic}
                          className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                        />
                        <h3 className="font-bold">
                          {comment.postedBy.fullName}<br></br>
                          <span className="text-sm text-gray-400 font-normal">
                          {comment.postedBy.username}
                          </span>
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-2">{comment.text}</p>
                      <button
                        className="text-right text-blue-500"
                        onClick={() => handleReply(index)}
                      >
                        Reply
                      </button>
                      {
                        UserId === comment.postedBy._id && (
                          <button
                          className="text-right text-blue-500"
                          onClick={() => handleDeleteComment(comment._id, index)}
                        >
                          Delete
                        </button>)
                      }

                      {
                        comment.replies.map((reply: any, index: number) => (
                          <div key={index}>
                          <div className="text-gray-300 font-bold pl-14">|</div>
                          <div className="flex justify-between border ml-5 rounded-md">
                            <div className="p-3">
                              <div className="flex gap-3 items-center">
                                <img
                                  src={reply.postedBy.pic}
                                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                />
                                <h3 className="font-bold">
                                  User 2<br></br>
                                  <span className="text-sm text-gray-400 font-normal">
                                    Level 1
                                  </span>
                                </h3>
                              </div>
                              <p className="text-gray-600 mt-2">
                                {reply.text}
                              </p>
                            </div>
                          </div>
                        </div>
                        ))
                      }
                      
                      {replyOpenIndex === index && ( // Show reply section only if replyOpenIndex matches the current comment index
                        <div>
                          <div className="text-gray-300 font-bold pl-14">|</div>
                          <div className="flex justify-between border ml-5 rounded-md">
                            <div className="p-3">
                              <div className="flex gap-3 items-center">
                                <img
                                  src={comment.postedBy.pic}
                                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                                />
                                <h3 className="font-bold">
                                  User 2<br></br>
                                  <span className="text-sm text-gray-400 font-normal">
                                    Level 1
                                  </span>
                                </h3>
                              </div>
                              <Input className="w-full" value={reply} onChange={(e)=>{setReply(e.target.value)}}></Input>
                              <button
                                className="text-right text-blue-500"
                                onClick={()=>handleAddReply(comment._id)}
                              >
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
