import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        updateUserProfile({ displayName: name, photoURL: photo })
            .then(() => {
                toast.success("Profile Updated Successfully!");
                setIsEditing(false);
                // Ideally force refresh or state update, but AuthContext listener might catch it or need reload
                // Just reloading for simplicity as Firebase auth object is tricky to sync instantly in context sometimes
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
                    <p className="text-gray-600">Welcome back, {user?.displayName}!</p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/tYHjp6B/user.png"} alt="Profile" />
                            </div>
                        </div>

                        {!isEditing ? (
                            <>
                                <h2 className="card-title text-2xl">{user?.displayName}</h2>
                                <p className="text-gray-500 mb-4">{user?.email}</p>
                                <div className="card-actions">
                                    <button onClick={() => setIsEditing(true)} className="btn btn-primary text-white px-8">Update Profile</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate} className="w-full max-w-md text-left">
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user?.displayName}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control mb-6">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="photo"
                                        defaultValue={user?.photoURL}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <button className="btn btn-primary text-white">Save Changes</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
