hortari.controller("ctrl",function($scope,fact,$interval,$timeout){
    var array = ['../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png','../images/bitcoin.png','../images/eth.ico','../images/ripple.png','../images/eos.png'];
    var items;
    var newarray;
    
    $scope.showItems = ()=>{
        var pr = fact.talkToServer();
        
        pr.then(function(data){ 
            $scope.result = data;
        }, function(err){
            $scope.error = err;
        });
        var interval = $interval(function(){
            if(!items){
        items = $scope.result;
    }
        },500);

        if(items){
        if(items.data){
            $interval.cancel(interval);
            // console.log("cancelled");
        }
    }

    var count=0;

       var interval2 =  $interval(function(){
           if(items){
            if(items.data){
                if(count<100){
                newarray = items.data.map(function(el) {
                    var o = Object.assign({}, el);
                    o.source = array[count];
                    count++;
                    return o;
                    
                });
            }    
            }
        }
            if(items && count==100){
                    $interval.cancel(interval2);
                } 
        
        },2000);
    var interval3 = $interval(function(){
        if(newarray){
            $scope.mainResult = newarray;
            // console.log(newarray);
            $scope.loaded=false;
            $interval.cancel(interval3);
        }
        else{
            $scope.loaded = true;
        }
        
    },100);   
    
    };

     
console.clear();
});