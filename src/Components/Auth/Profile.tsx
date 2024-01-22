import { useEffect, useState } from "react";
import authViewModel from "./AuthViewModel";
import Address from "../../Assets/address/Address";
import { observer } from "mobx-react";


const Profile = observer(() => {
  useEffect(() => {
    authViewModel.fetchProfile();
  }, []);
  const [selectedItem, setSelectedItem] = useState("profile");
  const [loggingOut, setLoggingOut] = useState(false);


  const handleLogOut = () => {
    setLoggingOut(true);
    setTimeout(async () => {
      const isLogedOut = await authViewModel.logoutHandler();
      if (isLogedOut) {
        window.location.href = "/login";
      }
      setLoggingOut(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] min-w-md max-w-lg m-auto mt-10">
      <section className="h-full p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full">
        <div className="flex">
          <button
            className={`flex-1 text-sm  ${selectedItem === "profile"
              ? "bg-[--primary-text-color] text-white"
              : "bg-gray-100"
              } p-3 shadow-sm transition-colors `}
            onClick={() => setSelectedItem("profile")}
          >
            Profile
          </button>
          <button
            onClick={() => setSelectedItem("address")}
            className={`flex-1 text-sm  ${selectedItem === "address"
              ? "bg-[--primary-text-color] text-white"
              : "bg-gray-100"
              } p-3 shadow-sm transition-colors `}
          >
            Address
          </button>
        </div>
        {selectedItem === "profile" ? (
          <div className="flex flex-col gap-4 w-full p-5">
            <p>
              <span className="text-gray-600 me-1">Username:</span>
              <span className="break-all">{authViewModel.profile?.username}</span>
            </p>
            <p>
              {" "}
              <span className="text-gray-600 me-1">Email:</span>{" "}
              <span className="break-all">{authViewModel.profile?.email ?? ""}</span>
            </p>
            <hr />
            <button
              disabled={loggingOut}
              className="w-1/2 text-sm bg-rose-600 py-2 px-4 text-white rounded-md hover:bg-rose-700"
              onClick={handleLogOut}
            >
              {loggingOut ? "Logging Out..." : "Logout"}
            </button>
          </div>
        ) : (
          <section className=" rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
           {authViewModel.profile && <Address addressList={authViewModel.profile.address} isEdit={true} />} 
          </section>
        )}
      </section>
    </div>
  );
});

export default Profile;
