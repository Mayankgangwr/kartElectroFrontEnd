import React, { Fragment, useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { IAddress } from "../../Components/Auth/AuthModel";
import { observer } from "mobx-react";
interface AddressProps {
  isEdit: boolean;
  addressList: IAddress | undefined;
}
const Address: React.FC<AddressProps> = observer(({ isEdit, addressList }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);
  const addressLists: IAddress[] | null = addressList ? [addressList] : null;
  return (
    <>
      {!isEdit && <h1 className="text-2xl font-bold">Address</h1>}
      {showAddressForm && !editAddress ? (
        <AddressForm
          setShowAddressForm={setShowAddressForm}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
        />
      ) : (
        <div className="flex flex-col items-start ">
          <button
            className="btn-rounded-primary text-sm "
            onClick={() => {
              setShowAddressForm(true);
              setEditAddress(false);
            }}
          >
            + Add New Address
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {showAddressForm ? <AddressForm
            setShowAddressForm={setShowAddressForm}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
          /> : (
          <AddressCard
            address={addressList}
            isEdit={isEdit}
            editAddress={editAddress}
            setEditAddress={setEditAddress}
            setShowAddressForm={setShowAddressForm}
          />
        )}
      </div>
    </>
  );
});

export default Address;
