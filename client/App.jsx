import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateGroup from './components/CreateGroup';
import GroupLinks from './components/GroupLinks';
import SearchGroup from './components/SearchGroup';
import ShowMyGroup from './components/ShowMyGroup';
import GroupMembers from './components/GroupMembers';
import Questions from './components/GroupMembers';
import Questions from './components/Questions';
import ProfileMenu from './components/ProfileMenu';
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';

const App = () => {
  return (
    <>
      <TopNavBar />
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<GroupLinks />} />
          <Route path={'/searchGroup'} element={<SearchGroup />} />
          <Route path={'/createGroup'} element={<CreateGroup />} />
          <Route path={'/group/specific'} element={<ShowMyGroup />} />
          <Route path={'/group/members'} element={<GroupMembers />} />
          <Route path={'/questions'} element={<Questions />} />
          <Route path={'/profile'} element={<ProfileMenu />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <BottomNavBar />
    </>
  );
};

export default App;
