import { useState } from "react";

function UserProfileComponent({ data }) {
    const [nameChanged, isNameChanged] = useState(false);
    const [emailChanged, isEmailChanged] = useState(false);
    const [passwordChanged, isPasswordChanged] = useState(false);
    function changeFormName() {
        isNameChanged(!nameChanged);
        return (
            <>
                <form action="" method="post" id="update-name-form">
                    <section id="form-name">
                        <label htmlFor="name">Name : </label>
                        <input type="text" name="name" id="input-name" />
                        <button type="button" id="checklist-button">
                            Checklist
                        </button>
                    </section>
                </form>
            </>
        );
    }
    function changeFormEmail() {
        isEmailChanged(!emailChanged);
        return (
            <>
                <form action="" method="post" id="update-email-form">
                    <section id="form-email">
                        <label htmlFor="email">Email : </label>
                        <input type="text" name="email" id="input-email" />
                        <button type="button" id="checklist-button">
                            Checklist
                        </button>
                    </section>
                </form>
            </>
        );
    }
    function changeFormPassword() {
        isPasswordChanged(!passwordChanged);
        return (
            <>
                <form action="" method="post" id="update-password-form">
                    <section id="form-password">
                        <label htmlFor="password">Password : </label>
                        <input type="text" name="password" id="input-password" />
                    </section>
                </form>
            </>
        );
    }
    return (
        <section>
            <section id="profile-header">Profile : </section>
            <section id="profile-name">
                <p id="owner-name">Nama Pemilik : {data.name}</p>
                <button type="button" className="edit-button" onClick={changeFormName}>
                    Pencil
                </button>
            </section>
            <section id="profile-email">
                <p id="owner-email">Email : {data.email}</p>
                <button type="button" className="edit-button" onClick={changeFormEmail}>
                    Pencil
                </button>
            </section>
            <section id="profile-password">
                <p>Change your password</p>
                <button type="button" className="edit-button" onClick={changeFormPassword}>
                    Pencil
                </button>
            </section>
            <section id="delete-profile">
                <button type="button" id="delete-button">Trash, Delete Profile</button>
            </section>
        </section>
    );
}


export default UserProfileComponent;
