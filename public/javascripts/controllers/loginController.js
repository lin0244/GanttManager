/**
 * Created by Elessar on 06/04/2017.
 * 
 * Gestion de l'Authentification de l'Utilisateur.
 * - Login : Login d'un utilisateur
 * - Register : Création d'un utilisateur
 * - Disconnect : Déconnexion d'un utilisateur
 */
angular.module("app").controller("loginController", function ($scope, $http, $cookies) {
    
    $scope.isAuth = false;

    //On vérifie au début de l'application, si la personne possède un Token de Session dans ses Cookies.
    //Si il possède un Token, c'est qu'il s'est connecté durant la période de validité de sa Session.
    if($cookies['tokenSession'] != null) {
         $scope.isAuth = true;
    }
    
    //Méthode pour envoyer la requête d'authentification au serveur
    $scope.submitAuth = () =>
    {
        //On récupère les informations du formulaire de Login, pour créer un objet d'Authentification.
        var auth = {
            'username' : $scope.username,
            'password': $scope.password
        };
    
        $http.post(window.location.href + 'login/auth',auth).then(function successCallback(response) 
        {
            //On crée la date d'expiration des Cookies. (Lendemain à 00h)
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            expireDate.setHours(0,0,0,0);
            
            //On place le Username et le Token de Session dans les Cookies du Navigateur. On place une date d'expiration pour le lendemain 00h00min00sec.
            //Cela correspond au moment du clean côté serveur.
            $cookies.put('username' , $scope.username, {'expires': expireDate});
            $cookies.put('tokenSession' , response.data, {'expires': expireDate});
            
        }, errorCallback);
        
        function errorCallback () 
        {
            alert("Erreur lors de l'envoie du JSON.");
        }
    };
  
    //Méthode pour envoyer la requête d'enregistrement au serveur
    $scope.submitRegister = () => 
    {
      //Création du User par rapport aux input du formulaire
        let  user = {
            'username' : $scope.username,
            'password': $scope.password,
            'email' : $scope.email
        };
    
        //Envoie de la requête    
        $http.post(window.location.href + 'login/register', user).then(function successCallback(response) 
        {

        }, errorCallback);
    
        //Methode si jamais erreur
        function errorCallback () 
        {
            alert("Erreur lors de l'envoie du JSON.");
        }
    };
    
    
    //Méthode pour envoyer la requête de deconnexion
    $scope.submitDisconnect = () => 
    {
        //Envoie de la requête    
        $http.post(window.location.href + 'login/disconnect', $cookies['username']).then(function successCallback(response) 
        {
            //On enlève les cookies du site côté client.
            $cookies.remove('username');
            $cookies.remove('tokenSession');
            $scope.isAuth = false;
        }, errorCallback);
    
        //Methode si jamais erreur
        function errorCallback () 
        {
            alert("Erreur lors de l'envoie du JSON.");
        }
    };
    
});