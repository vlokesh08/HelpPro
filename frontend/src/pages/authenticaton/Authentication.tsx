import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Login from "../../components/Authentication/Login";
import Signup from "../../components/Authentication/Signup";
import { useEffect } from "react";
const Authentication = () => {
  const data  = localStorage.getItem('userInfo');
  useEffect(() => {
    if(data){
      window.location.href = '/home';
    }
  })
  return (
    <>
      <div className="">
        <section className="text-gray-600 dark:text-white body-font ">
          <div className="xl:px-32 px-5 py-  flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center md:text-left">
                HelpPro
              </h1>
              <p className="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium text-black dark:text-white text-center md:text-left">
                HelpPro helps to complete your projects with help.
              </p>
            </div>
            <div className="lg:w-2/6 md:w-1/2   rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <div className="flex justify-center align-middle">
                <div>
                  <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="account">Login</TabsTrigger>
                      <TabsTrigger value="password">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                      <Login />
                    </TabsContent>
                    <TabsContent value="password">
                      <Signup />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-3 md:mt-0">
              
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Authentication;
