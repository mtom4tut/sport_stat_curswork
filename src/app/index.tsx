import { withProviders } from './providers';

// Components
import { Routing } from '../pages';

// Store
import { useStore } from 'effector-react';
import { $storeTables } from '~processes/getTable/model/store';

const App = () => {
  useStore($storeTables);

  return (
    <div className='app'>
      <Routing />
    </div>
  );
};

export default withProviders(App);
