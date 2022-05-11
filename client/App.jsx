import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateGroup from './components/CreateGroup';
import GroupLinks from './components/GroupLinks';
import SearchGroup from './components/SearchGroup';
import ShowMyGroup from './components/ShowMyGroup';
import GroupMembers from './components/GroupMembers';
import Questions from './components/GroupMembers';
import Questions from './components/Questions';
import ProfileMenu from './components/ProfileMenu';
import Footer from './components/shared/Footer';
import TopNavBar from './components/shared/TopNavBar';
import BottomNavBar from './components/shared/BottomNavBar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopNavBar />
        <Routes>
          <Route path={'/'} element={<GroupLinks />} />
          <Route path={'/searchGroup'} element={<SearchGroup />} />
          <Route path={'/createGroup'} element={<CreateGroup />} />
          <Route path={'/group/specific'} element={<ShowMyGroup />} />
          <Route path={'/group/members'} element={<GroupMembers />} />
          <Route path={'/questions'} element={<Questions />} />
          <Route path={'/profile'} element={<ProfileMenu />} />
        </Routes>
        <Footer />
        <BottomNavBar />
      </BrowserRouter>
    </>
  );
};

export default App;
