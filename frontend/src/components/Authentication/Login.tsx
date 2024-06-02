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
import { loginSuccess, loginFailure } from "@/Redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state : any) => state.user);
  const handleSubmit = async() => {
    console.log("lalalla");
    
    if(email==="" || password===""){
      
      toast('Please fill all the details')
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
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      toast('Login Successfull')
      console.log(data);
      dispatch(loginSuccess(data));
      navigate('/home');

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(loginFailure());
      toast('Invalid Credentials')
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
            <div className="flex justify-start">
                <CardTitle>Login</CardTitle>
            </div>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
          
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Email</Label>
            <Input
              id="name"
              defaultValue=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Password</Label>
            <Input
              id="username"
              defaultValue=""
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
        <Toaster />
            
          <Button onClick={handleSubmit}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
