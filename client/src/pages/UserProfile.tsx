interface UserProfileProps {
    user: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div className="w-[103%] overflow-hidden overflow-y-scroll custom-scrollbar flex flex-col gap-[4rem]">
            <div className="w-full flex flex-col gap-[1.5rem] pr-6">
                <h1 className="text-3xl font-semibold dark:text-white">My Profile</h1>
            </div>
        </div>
    )
}

export default UserProfile