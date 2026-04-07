import { useApp } from './context/AppContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { Layout } from './components/Layout';

const PAGES = {
  home: Home,
  explore: Explore,
  dashboard: Dashboard,
  settings: Settings,
};

export default function App() {
  const { currentPage } = useApp();
  const Page = PAGES[currentPage] || Home;

  return (
    <Layout>
      <Page key={currentPage} />
    </Layout>
  );
}
