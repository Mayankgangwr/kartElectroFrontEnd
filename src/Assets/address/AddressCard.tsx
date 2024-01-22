import { observer } from "mobx-react";
import { IAddress } from "../../Components/Auth/AuthModel";

interface AddressCardProps {
  isEdit?: boolean;
  address?: IAddress;
  editAddress?: any;
  setEditAddress?: any;
  setShowAddressForm?: any;
  showInput?: boolean;
  setCurrentAddress?: any;
}
const AddressCard: React.FC<AddressCardProps> = ({ isEdit, address, editAddress, setEditAddress, setShowAddressForm, showInput, setCurrentAddress }) => {
  return (
    <label
      className={`flex ${isEdit ? "bg-gray-100" : "bg-gray-50"
        }  items-center gap-2 shadow-sm p-4 rounded-sm cursor-pointer`}
    >
      {showInput && (
        <input
          type="radio"
          name="address"
          id=""
          className="accent-current me-2"
          checked
          onChange={() => setCurrentAddress(address)}
        />
      )}
      <div>
        <h3 className="text-lg font-semibold break-all">{`Mayank Gangwar`}</h3>
        <p className="text-sm text-gray-500 break-all">
          {'B-020'},{address?.street}
        </p>
        <p className="text-sm text-gray-500 break-all">
          {address?.city},{address?.zipcode}
        </p>
        <p className="text-sm text-gray-500">
          Mobile:
          <span className="font-semibold ps-1 break-all">{address?.number}</span>
        </p>
        {isEdit && (
          <div className="flex gap-3 py-2">
            <button
              className="text-amber-500 font-bold"
              onClick={() => {
                setEditAddress(address);
                setShowAddressForm(true);
              }}
            >
              Edit
            </button>
            <button
              className="text-red-600 font-bold"
            // onClick={() => deleteAddress(id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </label>
  );
};
export default observer(AddressCard);
