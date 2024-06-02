import axios from 'axios'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
const HomePageProfiles = () => {
  const user = useSelector((state : any) => state.user);
  const [profiles, setProfiles] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


    useEffect(() => {
      console.log(backendURL);
        axios
          .get(`${backendURL}/api/profile/getProfilesForHomePage`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            console.log(response.data); // This will print the data from the API to the console
            setProfiles(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }, []);
      return (
        <div className="flex flex-col items-center mb-4 rounded-2xl ring-1 ring-gray-200 shadow-lg p-5">
          <h4 className='mb-3 font-bold'>Profiles</h4>
          {
            profiles?.map((profile : any) => {
              return (
                <div key={profile._id} className="flex items-center mb-4 w-full">
                  <img
                    src={profile.pic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-sm">{profile.firstName} {profile.lastName}</p>
                    <p className="text-gray-600 text-sm">@{profile.username}</p>
                  </div>
                </div>
              )
            })
          }
          {/* <img
            src={profile.imageUrl}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-bold">{profile.name}</p>
            <p className="text-gray-600">@{profile.id}</p>
          </div> */}
        </div>

      );
}


export default HomePageProfiles;