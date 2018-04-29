hortari.controller("ctrl",function($scope,fact,$interval,$timeout){
    var array = ['images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png','images/bitcoin.png','images/eth.ico','images/ripple.png','images/eos.png'];
    var items;
    var newarray;
    
    function showItems(){
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
            $scope.loaded=false;
            $interval.cancel(interval3);
        }
        else{
            $scope.loaded = true;
        }
        
    },100);   
    
    };
    showItems();
    $interval(function(){    
        showItems();
    },300000);

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
        {'id':2,'name':'$100 +','lower':100,'upper':-1},
        {'id':3,'name':'$1 - $100','lower':1,'upper':100},
        {'id':4,'name':'$0.01 - $1','lower':0.01,'upper':1},
        {'id':5,'name':'$0.0001 - $0.01','lower':0.0001,'upper':0.01},
        {'id':6,'name':'$0 - $0.0001','lower':0,'upper':0.0001},
     ];

     $scope.thirdOptions = [
        {'id':1,'name':'All','lower':0,'upper':-1},
        {'id':2,'name':'$10 Million+','lower':10000000,'upper':-1},
        {'id':3,'name':'$1 Million+','lower':1000000,'upper':-1},
        {'id':4,'name':'$100k +','lower':100000,'upper':-1},
        {'id':5,'name':'$10k +','lower':10000,'upper':-1},
        {'id':6,'name':'$1k +','lower':1000,'upper':-1},
     ];
    


var visited=0;
var max;
var min;
var c1=0,c2=0,c3=0;
var oldarray;

$scope.getOption=(opted)=>{
        if(opted == 1 && !c2 && !c3){
            if($scope.search1.upper==-1)
            max = Number.MAX_SAFE_INTEGER;
            else
            max = $scope.search1.upper;
            min = $scope.search1.lower;
            oldarray = newarray.filter(function(el){
                return el.market_cap_usd<max && el.market_cap_usd>min
            });
            $scope.mainResult=oldarray;
            visited++;
            c1++;
            if($scope.mainResult.length==100){
                c1=0;
            }
            return;
        }
        else if(opted == 2 && !c1 && !c3){
            if($scope.search2.upper==-1)
            max = Number.MAX_SAFE_INTEGER;
            else
            max = $scope.search2.upper;
            min = $scope.search2.lower;
            oldarray=newarray.filter(function(el){
                return el.price_usd>min && el.price_usd<max;
            });
            $scope.mainResult=oldarray;
            visited++;
            c2++;
            if($scope.mainResult.length==100){
                c2=0;
            }
            return;
        }
        else if(opted==3 && !c2 && !c1){
            max = Number.MAX_SAFE_INTEGER;
            min = $scope.search3.lower;
            oldarray=newarray.filter(function(el){
                return el["24h_volume_usd"]>min && el["24h_volume_usd"]<max;
            });
            $scope.mainResult=oldarray;
            visited++;
            c3++;
            if($scope.mainResult.length==100){
                c3=0;
            }
            return;
        }

        if(visited){
                if(opted==1){
                    c1++;
                if($scope.search1.upper==-1)
                max = Number.MAX_SAFE_INTEGER;
                else
                max = $scope.search1.upper;
                min = $scope.search1.lower;
                    $scope.mainResult=newarray.filter(function(el){
                        return el.market_cap_usd<max && el.market_cap_usd>min
                    });
                    if(c2){
                    if($scope.search2.upper==-1)
                max = Number.MAX_SAFE_INTEGER;
                else
                max = $scope.search2.upper;
                min = $scope.search2.lower;
                    var oldarray3=$scope.mainResult.filter(function(el){
                        return el.price_usd>min && el.price_usd<max;
                    });
                    $scope.mainResult=oldarray3;
                }
                    if(c3){
                    max = Number.MAX_SAFE_INTEGER;
                    min = $scope.search3.lower;
                    var oldarray4=$scope.mainResult.filter(function(el){
                        return el["24h_volume_usd"]>min && el["24h_volume_usd"]<max;
                    });
                    $scope.mainResult=oldarray4;
                }
                if($scope.search1.id==1)
                c1=0;
            }
            else if(opted==2){
                c2++;
                if($scope.search2.upper==-1)
                max = Number.MAX_SAFE_INTEGER;
                else
                max = $scope.search2.upper;
                min = $scope.search2.lower;
                    var oldarray3=newarray.filter(function(el){
                    return el.price_usd>min && el.price_usd<max;
                });
                $scope.mainResult=oldarray3;
                if(c1){
                    if($scope.search1.upper==-1)
                max = Number.MAX_SAFE_INTEGER;
                else
                max = $scope.search1.upper;
                min = $scope.search1.lower;
                var oldarray2 = $scope.mainResult.filter(function(el){
                    return el.market_cap_usd<max && el.market_cap_usd>min
                });
                $timeout(function(){$scope.mainResult=oldarray2;});
                }
                if(c3){
                    max = Number.MAX_SAFE_INTEGER;
                min = $scope.search3.lower;
                var oldarray4=$scope.mainResult.filter(function(el){
                    return el["24h_volume_usd"]>min && el["24h_volume_usd"]<max;
                });
                $scope.mainResult=oldarray4;
            }
            if($scope.search2.id==1)
            c2=0;
            }
               else if(opted==3){
                    c3++;
                max = Number.MAX_SAFE_INTEGER;
                min = $scope.search3.lower;
                var oldarray4=newarray.filter(function(el){
                    return el["24h_volume_usd"]>min && el["24h_volume_usd"]<max;
                });
                $scope.mainResult=oldarray4;
                if(c1){
                    if($scope.search1.upper==-1)
                    max = Number.MAX_SAFE_INTEGER;
                    else
                    max = $scope.search1.upper;
                    min = $scope.search1.lower;
                    var oldarray2 = $scope.mainResult.filter(function(el){
                        return el.market_cap_usd<max && el.market_cap_usd>min
                    });
                    $scope.mainResult=oldarray2;
                }
                if(c2){
                    if($scope.search2.upper==-1)
                max = Number.MAX_SAFE_INTEGER;
                else
                max = $scope.search2.upper;
                min = $scope.search2.lower;
                    var oldarray3=$scope.mainResult.filter(function(el){
                        return el.price_usd>min && el.price_usd<max;
                    });
                    $scope.mainResult=oldarray3;
                }
                if($scope.search3.id==1)
                    c3=0;  
            }
        }
}


$scope.fillIt=(items)=>{
    $scope.modal = items;
}

// END OF SCOPE

});