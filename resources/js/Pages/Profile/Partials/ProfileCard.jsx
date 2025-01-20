import ProfilePicture from '@/Components/ProfilePicture.jsx';
import UserBirthday from '@/Components/UserBirthday.jsx';
import UserEmail from '@/Components/UserEmail.jsx';
import UserName from '@/Components/UserName.jsx';

export default function ProfileCard() {
    return (
        <div className="w-full max-w-xs space-y-4 rounded-lg bg-white p-6 shadow-lg">
            {/* Profile picture */}
            <div className="flex justify-center">
                <div className="avatar">
                    <div className="w-24 rounded">
                        <ProfilePicture />
                    </div>
                </div>
            </div>

            {/* Name */}
            <div className="space-y-1 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                    <UserName />
                </h2>
                <UserEmail className="text-sm text-gray-600" />
            </div>

            {/* Birthday */}
            <div className="text-center">
                <UserBirthday className="text-sm text-gray-600" />
            </div>

            {/* Optionally, add a button or other profile actions */}
            <div className="mt-4 text-center">
                <button className="btn btn-primary w-full">Edit Profile</button>
            </div>
        </div>
    );
}
