import ProfilePictureUpload from './Partials/ProfilePictureUpload';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import ProfileCard from './Partials/ProfileCard';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                <ProfileCard />
                <button
                    className="btn"
                    onClick={() =>
                        document.getElementById('my_modal_2').showModal()
                    }
                >
                    open modal
                </button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <ProfilePictureUpload />
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute btn btn-circle btn-ghost btn-sm right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <div></div>

                <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* <div className="p-4 bg-white shadow sm:rounded-lg sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div> */}
            </div>
        </>
    );
}
