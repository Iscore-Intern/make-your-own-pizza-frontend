type headerFields = {
    firstName: string;
    lastName: string;
    email: string;
}

export default function ProfileHeader({ firstName, lastName, email }: headerFields) {

    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()

    return (
        <header className="profile-identity">

                <div className="pizza-avatar">
                    <div className="pizza-ring pizza-ring--1"></div>
                    <div className="pizza-ring pizza-ring--2"></div>
                    <div className="pizza-ring pizza-ring--3"></div>
                    <div className="pizza-ring pizza-ring--4"></div>
                    <div className="topping t-1"></div>
                    <div className="topping t-2"></div>
                    <div className="topping t-3"></div>
                    <div className="topping t-4"></div>
                    <span className="pizza-avatar-initials">{initials}</span>
                </div>
            <div className="profile-data">
                <h2>{firstName} {lastName}</h2>
                <p>{email}</p>
            </div>
        </header>
    )
}
