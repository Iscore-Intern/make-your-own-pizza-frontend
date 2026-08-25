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
        <section className="profile-section">
            <header className="profile-section-header">
                <h3 className="profile-section-title">Your Address</h3>
                {!hasAddress && <button type="button" className="btn-outline-small" onClick={onEdit}>Add address</button>}
            </header>

            {hasAddress ? (
                <div className="address-box">
                    <div className="address-list">
                        <p>{city}, {street}</p>
                        <p>District: {district}</p>
                        <p>Building No: {building_no}</p>
                        <p>Floor No: {floor_no}</p>
                        <p>Apartment No: {apt_no}</p>
                    </div>
                    <button type="button" className="btn-outline-small" onClick={onEdit}>Edit</button>
                </div>
            ) : (
                <p className="address-empty">No address added yet.</p>
            )}

            {isModalOpen && (
                <AddressForm
                    formik={formik}
                    onCancel={onCancel}
                    onDelete={onDelete}
                />
            )}
        </section>
    )
}
