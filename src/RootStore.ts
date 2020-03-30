import HomeStore from './layout/HomeStore';
import RestService from './service/RestService';

class RootStore {
    homeStore: HomeStore = new HomeStore();
}

export default RootStore;
