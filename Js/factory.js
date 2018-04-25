hortari.factory("fact",function($http,$q){
    const object = {

        talkToServer(){
            var pr = $q.defer();
            var url = "https://api.coinmarketcap.com/v1/ticker/";
            $http.get(url).then(success,failure);

            function success(data){
                pr.resolve(data);
                // console.log(data);
            }
            function failure(error){
                pr.reject(error);
            }
            return pr.promise;
        }

    };

    return object;

});