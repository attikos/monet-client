export default {
    getUser      : state => state.user,
    getAuthState : state => state.isAuthenticated,
    getIsWelcome : state => state.isWelcome,
};
