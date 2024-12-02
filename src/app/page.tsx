import EmptyMenu from './components/EmptyMenu';
import Menu from './components/Menu';
import {MenusElement} from './interfaces/IMenu';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const response = await fetch('http://localhost:3000/menus');
  const menus = (await response.json()) as MenusElement[];

  return (
    <div className="my-8">
      <EmptyMenu />
      {menus.map(item => (
        <Menu menu={item} key={item.id} />
      ))}
    </div>
  );
};

export default Home;
