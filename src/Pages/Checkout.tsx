import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import cartViewModel from "../Components/Cart/CartViewModel";
import Address from "../Assets/address/Address";
import Modal from "../Assets/checkout/Modal";
import SummaryCard from "../Assets/checkout/SummaryCard";
import authViewModel from "../Components/Auth/AuthViewModel";
import { observer } from "mobx-react";

const Checkout: React.FC = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    cartViewModel.getCartItems();
    authViewModel.fetchProfile();
  }, []); 
  const [showModal, setShowModal] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.state !== "cart" || !cartViewModel.allCartItems?.products.length) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="md:min-h-[80vh] flex justify-center items-center py-3">
        <main className="grid md:grid-cols-2 gap-10 w-full">
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <section className="p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
          {authViewModel.profile && <Address addressList={authViewModel.profile.address} isEdit={false} />} 
          </section>
          <SummaryCard setShowModal={setShowModal} />
        </main>
      </div>
    </>
  );
});

export default Checkout;
