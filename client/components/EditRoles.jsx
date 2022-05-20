import {useLocation} from "react-router-dom";
import GroupMembers from "./GroupMembers";
import UserCard from "./shared/UserCard";

export function EditRoles() {


    const location = useLocation();

    const group = location.state.group;

    console.log(group)


    return <div>
        {group.groupMember.map((groupmember) => (
            <div>
                <UserCard key={groupmember.user.username} edit={true} user={groupmember} />
                <button>MakeAdmin</button>
                <div>
                <button>Remove member</button>

                </div>
            </div>

        ))}
    </div>;
}
