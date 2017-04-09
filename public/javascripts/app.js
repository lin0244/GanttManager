/**
 * Created by leino on 06/04/2017.
 */
var app = angular.module('app', [
    'ngMaterial', 'ngCookies', 'angularMoment',
    'gantt', 'gantt.table', 'gantt.movable', 'gantt.tooltips', 'gantt.drawtask'
]);
app.value('serverData', window.serverData);

app.factory("AuthService", () => {
    
    let isAuth;
    
    function getAuth() {
        return isAuth;
    }
    function setAuth(auth) {    
        isAuth = auth;
    }
    return {
        getAuth: getAuth,
        setAuth: setAuth,
    }
});