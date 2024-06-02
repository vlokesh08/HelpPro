import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {useParams} from 'react-router-dom'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditFullPost = () => {
    const {id} = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [techstack, setTechstack] = useState("");
  const [bounty1, setBounty1] = useState("");
  const [bounty2, setBounty2] = useState("");
  const [date, setDate] = useState("");
  const [inputs, setInputs] = useState([""]);
  const [files, setFiles] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (index : any, value : any) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
  };

  const handleRemoveInput = (index : any) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const [message, setMessage] = useState("");

  const handleFile = (e: any) => {
    setMessage("");
    const file = e.target.files[0];
    postDetails(file);
  };

  const removeImage = (imageUrlToRemove: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((imageUrl) => imageUrl !== imageUrlToRemove)
    );
  };

  const postDetails = (pic: any) => {
    setLoading(true);
    if (pic === undefined) {
      toast("Please select an image");
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-application");
      data.append("cloud_name", "dyhb5midi");
      fetch("https://api.cloudinary.com/v1_1/dyhb5midi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const uploadedImageUrl = data.secure_url;
          setFiles((prevFiles : any) => [...prevFiles, uploadedImageUrl]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast("Please select image file");
    }
  };

  const user = useSelector((state : any) => state.user);

  const clipPathStyle = {
    clipPath:
      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
  };


  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .get(`${backendURL}/api/posts/getpostbyid/${id}`, config)
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
        setTechstack(response.data.techstack.join(",") );
        setBounty1(response.data.bounty[0]);
        setBounty2(response.data.bounty[1]);
        setDate(response.data.date);
        setInputs(response.data.links);
        setFiles(response.data.pics);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // split tech stack and make it as a array
    const temp = techstack.split(",");

    setLoading(true);
    const data = {
      username: user.username,
      title: title,
      body: body,
      techstack: temp,
      links: inputs,
        pics: files,
      bounty: [bounty1, bounty2],
      date: date,
    };
    const res = await axios.put(
      `${backendURL}/api/posts/editpost/${id}`,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setLoading(false);
    if (res.status === 200) {
      toast("Post added successfully");
      navigate("/home");
    } else {
      toast("Error in adding post");
    }
  };

  return (
    <div className="m-5 ">
      <div className="isolate bg-white  sm:py-15 lg:px-4">
        <div
          className="inset-x-0 top-[-10rem]  transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className=" left-1/2  w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={clipPathStyle}
          ></div>
        </div>
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Post
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600"></p>
        </div>
        <div className="mx-auto mt-4 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  rows={parseInt("8")}
                  name="message"
                  id="message"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Bounty Amount
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={bounty1}
                  onChange={(e) => setBounty1(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Bounty Amount
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={bounty2}
                  onChange={(e) => setBounty2(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Tech Stack{" "}
                <span className=" text-xs font-light">
                  (Give them comma separated values like: HTML, CSS, JS)
                </span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={techstack}
                  onChange={(e) => setTechstack(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Image URL
              </label>
              <div className="mt-2.5">
                <div className="flex justify-center w-full px-3">
                  <div className="rounded-lg shadow-xl bg-gray-50  w-full">
                    <div className="m-4">
                      <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                        {message}
                      </span>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center pt-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-label="Upload icon"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Select a photo
                            </p>
                          </div>
                          <input
                            type="file"
                            onChange={handleFile}
                            className="opacity-0"
                            name="files[]"
                          />
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {files.map((imageUrl, key) => (
                          <div key={key} className="overflow-hidden relative">
                            <i
                              onClick={() => removeImage(imageUrl)}
                              className="mdi mdi-close absolute right-1 hover:text-gray cursor-pointer"
                            >
                              x
                            </i>
                            <img
                              className="h-20 w-20 rounded-md"
                              src={imageUrl}
                              alt={`Uploaded image ${key}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                End Date
              </label>
              <div className="relative mt-2.5">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Links
              </label>
              <div className="flex justify-end">
                <Button className="mr-3" onClick={handleAddInput}>
                  Add New Link
                </Button>
              </div>
              {inputs.map((input, index) => (
                <div key={index} className="flex flex-row m-2">
                  <input
                    type="text"
                    value={input}
                    className="block w-full rounded-md border-0  mr-3 px-3.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                  <Button onClick={() => handleRemoveInput(index)}>-</Button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            {
              loading ? <Button disabled>Loading...</Button> : <button
              type="submit"
              onClick={handleSubmit}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFullPost;
