import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const user = useSelector((state : any) => state.user);
  const [pic, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast()
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  
  const postDetails = (pic : any) => {
    setLoading(true);
    if(pic===undefined){
      toast('Please select an image')
      return;
    }
    if(pic.type==="image/jpeg" || pic.type==="image/png" || pic.type==="image/jpg"){
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
          setPicture(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    else{
      toast('Please select image file')
    }
  }

  const handleSubmit = async() => {
    setLoading(true);
    console.log("lalalla");
    
    if(firstName==="" || email==="" || password==="" || pic==="" || username==="" || lastName===""){
      
      toast('Please fill all the details')
      return;
    }

    if(password!==confirmpassword){
      toast('Password and Confirm Password should be same')
      return;
    }
    
    try {
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
      };
      const { data } = await axios.post(
        `${backendURL}/api/user`,
        { username, firstName, lastName, email, password, pic},
        config
      );
      toast('Account created successfully')
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast('Problem with the Server Try again')
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <div className="space-y-1">
            <Label htmlFor="current">Username</Label>
            <Input
              id="current"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">First Name</Label>
            <Input
              id="current"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">Last Name</Label>
            <Input
              id="current"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Email</Label>
            <Input
              id="new"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
            <Input
              id="new"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Confirm Password</Label>
            <Input
              id="new"
              type="text"
              value={confirmpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pic">Picture</Label>
            <Input id="pic" type="file" accept="image/*" onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                postDetails(files[0]);
              }
            }} />
          </div>
        </CardContent>
        <CardFooter>
          <Toaster />
          {
            loading ? <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button> : <Button onClick={handleSubmit}>Submit</Button>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
