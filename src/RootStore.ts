import LoginStore from "./login/LoginStore";

class RootStore {
    loginStore: LoginStore = new LoginStore();
}

export default RootStore;
