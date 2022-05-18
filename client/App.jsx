import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGroup from "./components/CreateGroup";
import GroupLinks from "./components/GroupLinks";
import SearchGroup from "./components/SearchGroup";
import GroupMembers from "./components/GroupMembers";
import Questions from "./components/Questions";
import ProfileMenu from "./components/shared/ProfileMenu";
import Footer from "./components/shared/Footer";
import TopNavBar from "./components/shared/TopNavBar";
import BottomNavBar from "./components/shared/BottomNavBar";
import GroupPage from "./components/GroupPage";
import SearchUser from "./components/SearchUser";
import SearchGroupResults from "./components/SearchGroupResults";
import SearchUserResults from "./components/SearchUserResults";
import GroupCriteriaPage from "./components/GroupCriteriaPage";
import LeftNavBar from "./components/shared/LeftNavBar";
import { EditGroupProfile } from "./components/EditGroupProfile";
import { EditRoles } from "./components/EditRoles";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopNavBar />
        <main className="bg-dark-6 flex">
          <LeftNavBar />
          <div className="w-full h-screen overflow-scroll">
            <div className="container mx-auto py-16 w-full">
              <Routes>
                <Route path={"/"} element={<GroupLinks />} />
                <Route path={"/searchGroup"} element={<SearchGroup />} />
                <Route
                  path={"/searchGroup/searchGroupResults"}
                  element={<SearchGroupResults />}
                />
                <Route path={"/createGroup"} element={<GroupCriteriaPage createdGroup={true} />} />
                <Route path={"/group/specific"} element={<GroupPage />} />
                <Route
                  path={"/group/groupCriteria"}
                  element={<GroupCriteriaPage editGroup={true} />}
                />
                <Route path={"/group/members"} element={<GroupMembers />} />
                <Route
                  path={"/group/editProfile"}
                  element={<EditGroupProfile />}
                />
                <Route path={"/group/editRoles"} element={<EditRoles />} />
                <Route
                  path={"/group/members/searchUser"}
                  element={<SearchUser />}
                />
                <Route
                  path={"/group/members/searchUser/searchUserResults"}
                  element={<SearchUserResults />}
                />
                <Route path={"/questions"} element={<Questions />} />
                <Route path={"/profile"} element={<ProfileMenu />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </main>
        <BottomNavBar />
      </BrowserRouter>
    </>
  );
};

export default App;
