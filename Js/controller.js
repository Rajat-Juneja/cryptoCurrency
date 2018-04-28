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
            // $scope.search1;
            $scope.loaded=false;
            $interval.cancel(interval3);
        }
        else{
            $scope.loaded = true;
        }
        
    },100);   
    
    };

    $scope.firstOptions = [
        {'id':1,'name':'All','lower':0,'upper':-1},
        {'id':2,'name':'$1 Billion +','lower':1000000000,'upper':-1},
        {'id':3,'name':'$100 Million - $1 Billion','lower':100000000,'upper':1000000000},
        {'id':4,'name':'$10 Million - $100 Million','lower':10000000,'upper':100000000},
        {'id':5,'name':'$1 Million - $10 Million','lower':1000000,'upper':10000000},
        {'id':6,'name':'$100k - $1 Million','lower':100000,'upper':1000000},
        {'id':7,'name':'$0 - $100k','lower':0,'upper':100000}
    ];

    $scope.secondOptions = [
        {'id':1,'name':'All','lower':0,'upper':-1},
        {'id':2,'name':'$100 +','lower':1000000000,'upper':-1},
        {'id':3,'name':'$1 - $100','lower':100000000,'upper':1000000000},
        {'id':4,'name':'$0.01 - $1','lower':10000000,'upper':100000000},
        {'id':5,'name':'$0.0001 - $0.01','lower':1000000,'upper':10000000},
        {'id':6,'name':'$0 - $0.0001','lower':100000,'upper':1000000},
     ];
    
    var searchedArray;
    var latestarray;
// console.clear();
$scope.getOption1=()=>{
    searchedArray = newarray;
    // console.log(searchedArray);
    console.log($scope.search1);
    if($scope.search1.upper==-1)
    var max = Number.MAX_SAFE_INTEGER;
    else
    var max = $scope.search1.upper;
    var min = $scope.search1.lower;
    
    $scope.mainResult = newarray.filter(function(el){
        return el.market_cap_usd<max && el.market_cap_usd>min
    });
    // $scope.mainResult = latestarray;

    console.log(latestarray);
};
// $interval(console.log($scope.search1),5000);

$scope.getOption2=()=>{
    
};

});