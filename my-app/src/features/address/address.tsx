import "./address.css";
import AddressForm from "./AddressForm";
import useAddress from "@/Core/Hooks/Address/useAddress.Hook";
import type AddressValues from "@/Core/Interfaces/Address/AddressValues.Interface";
import type UserData from "@/Core/Interfaces/Profile/UserData.Interface";

type AddressProps = AddressValues & {
    onSave: (data: UserData) => void;
}

export default function Address({ city, street, district, building_no, floor_no, apt_no, onSave }: AddressProps) {
    const address = { city, street, district, building_no, floor_no, apt_no };
    const { isModalOpen, formik, onEdit, onCancel, onDelete } = useAddress(address, onSave);

    const hasAddress = Boolean(city || street);

    return (
        <div className="address-section">
            <header className="address-section-header">
                <h2>Your Address</h2>
                {!hasAddress && <button className="add-btn" onClick={onEdit}>Add address</button>}
            </header>
            <section className="address-section-details">
                {hasAddress ? (
                    <div className="address-box">
                        <div className="address-list">
                            <p>{city}, {street}</p>
                            <p>District: {district}</p>
                            <p>Building No: {building_no}</p>
                            <p>Floor No: {floor_no}</p>
                            <p>Apartment No: {apt_no}</p>
                        </div>

                        <div className="address-actions-btn">
                            <button onClick={onEdit}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <p>No address added yet.</p>
                )}
            </section>

            {isModalOpen && (
                <AddressForm
                    formik={formik}
                    onCancel={onCancel}
                    onDelete={onDelete}
                />
            )}
        </div>
    )
}
