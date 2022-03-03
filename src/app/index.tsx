import { withProviders } from './providers';

// Components
import { Routing } from '../pages';

const App = () => {
  return (
    <div className='app'>
      <Routing />
    </div>
  );
};

export default withProviders(App);
