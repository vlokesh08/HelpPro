import PersonalInformation from "@/components/Profile/PersonalInformation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from 'react-redux';
import EditProfile from "./EditProfile";
import Posts from "../Posts/Posts";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'EditProfile':
        return <EditProfile />;
      case 'Posts':
        return <Posts />;
      case 'PersonalInformation':
        return <PersonalInformation />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 mt-12">
            <div className="bg-white rounded-3xl ring-1 ring-gray-200 shadow-lg p-4">
              <img className=" rounded-full" src={user.pic} alt="user profile"></img>
              <div className="text-center m-5 flex flex-col gap-3">
              <Button className="opacity-60" onClick={() => renderComponent('PersonalInformation')}>
                  Profile
                </Button>
                <Button className="opacity-60" onClick={() => renderComponent('EditProfile')}>
                  Edit Profile
                </Button>
                <Button className="opacity-60" onClick={() => renderComponent('Posts')}>
                  Posts
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
