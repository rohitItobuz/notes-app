import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getAllAdmins } from "../../utils/getAllAdmins";
import default_profile_pic from "../../assets/default_profile_pic.webp";
import { ChatContext } from "../../context/ChatsContext";
import { RxCross1 } from "react-icons/rx";

export const ContactModal = () => {
    const { userList, setUserList } = useContext(UserContext);
    const { setChatModal, setChatUser, setContactModal } = useContext(ChatContext);

    useEffect(() => {
        getAllAdmins(setUserList);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
        <div className="max-w-96 mx-auto rounded-xl overflow-hidden border max-h-[600px] p-2 bg-teal-400 shadow-xl">
            <div className="text-end border-b-2">
            <button
                onClick={() => {
                    setChatUser("");
                    setContactModal(false);
                    setChatModal(false);
                }}
            >
                <RxCross1 size={22} />
            </button>
            </div>
            {userList.map((user) => (
                <div
                    key={user.username}
                    className="flex items-center gap-3 border-b-2 p-2 cursor-pointer"
                    onClick={() => {
                        setChatUser(user);
                        setChatModal(true);
                    }}
                >
                    <img
                        className="w-9 h-9 rounded-full"
                        src={
                            user.profile === ""
                                ? default_profile_pic
                                : user.profile.replace("http:/", "http://")
                        }
                        alt="profile"
                    />
                    <span className="truncate">{user.username}</span>
                </div>
            ))}
        </div>
        </div>
    );
};
