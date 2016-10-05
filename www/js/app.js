// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('CollageCtrl',['$scope','$http','$timeout',function($scope,$http,$timeout){

  $scope.imageArray = [
    "img/238_1759_70.jpg",
    "img/238_1759_76.jpg",
    "img/283_1713_67.jpg",
    "img/238_1584_23.jpg",
    "img/283_1713_67.jpg"
  ]

  function getSampleFile(dirEntry) {
    $http.get('img/238_1759_70.jpg').then(
      function(response){
        console.log('getFile success');
        setTimeout(function() {
              createCanvasImage()
            }, 100);
        //$scope.$apply()
      },
      function(error){
        console.log('error getting file');
      }
    )
}

getSampleFile()

function createCanvasImage () {
  var canvas = document.createElement("CANVAS");
  var image = document.createElement("IMG");
  image.setAttribute('id','collageImage');
      canvas.width = 1000;
      canvas.height = 1000;
      //console.log('canvas: ',canvas);
      //document.body.appendChild(canvas);
      document.body.appendChild(canvas);
      document.body.appendChild(image);

        //var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext('2d');
        var arr = [];
        
        for(var i=0; i<$scope.imageArray.length; i++) {
            
            var imageNo = i;
            imageNo = new Image();
            imageNo.src= $scope.imageArray[i];
            console.log($scope.imageArray[i])
            arr.push(imageNo);
            if($scope.imageArray.length==1){
              drawImg1()
            }else if($scope.imageArray.length==2){
              drawImg2()
            }else if($scope.imageArray.length==3){
              drawImg3()
            }else if($scope.imageArray.length==4){
              drawImg4()
            }else if($scope.imageArray.length==5){
              drawImg5()
            }

            

            
        }
        function drawImg1(){
          arr[(arr.length-1)].onload = function() {
            console.log('array: ',arr)
            context.drawImage(arr[0], 0, 0, 1000, 1000);
            image.src=canvas.toDataURL("image/jpeg")
            $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
            createFile();
          }
        }

        function drawImg2(){
          arr[(arr.length-1)].onload = function() {
            console.log('array: ',arr)
            context.drawImage(arr[0], 0, 0, 500, 1000);
            context.drawImage(arr[1], 500, 0, 500, 1000);
            image.src=canvas.toDataURL("image/jpeg")
            $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
            createFile();
          }
        }

        function drawImg3(){
          arr[(arr.length-1)].onload = function() {
            console.log('array: ',arr)
            context.drawImage(arr[0], 0, 0, 500, 1000);
            context.drawImage(arr[1], 500, 0, 500, 500);
            context.drawImage(arr[2], 500, 500, 500, 500);
            image.src=canvas.toDataURL("image/jpeg")
            $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
            createFile();
          }
        }

        function drawImg4(){
          arr[(arr.length-1)].onload = function() {
            console.log('array: ',arr)
            context.drawImage(arr[0], 0, 0, 500, 500);
            context.drawImage(arr[1], 500, 0, 500, 500);
            context.drawImage(arr[2], 0, 500, 500, 500);
            context.drawImage(arr[3], 500, 500, 500, 500);
            image.src=canvas.toDataURL("image/jpeg")
            $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
            createFile();
          }
        }

        function drawImg5(){
          arr[(arr.length-1)].onload = function() {
            console.log('array: ',arr)
            context.drawImage(arr[0], 0, 0, 1000/3, 500)
            context.drawImage(arr[1], 0, 500, 1000/3, 500)
            context.drawImage(arr[2], 1000/3, 500, 1000/3, 500)
            context.drawImage(arr[3], 2000/3, 500, 1000/3, 500)
            context.drawImage(arr[4], 1000/3, 0, 2000/3, 500)
            image.src=canvas.toDataURL("image/jpeg")
            $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
            createFile();
          }
        }
        

        /*
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        
        img4.onload = function() {
          context.drawImage(img1, 0, 0, 500, 500)
          context.drawImage(img2, 500, 0, 500, 500)
          context.drawImage(img3, 0, 500, 500, 500)
          context.drawImage(img4, 500, 500, 500, 500)
          image.src=canvas.toDataURL("image/jpeg")
          $('#actualImage').attr('src', canvas.toDataURL("image/jpeg"));
          createFile();
        }
        img1.src = "img/238_1759_70.jpg"
        img2.src = "img/283_1713_67.jpg"
        img3.src = "img/238_1759_70.jpg"
        img4.src = "img/283_1713_67.jpg"
        */
        
        console.log('create canvas completed',canvas.toDataURL("image/jpeg"));
      }

        var createFile = function() {
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                    function(fs) {
                fs.root.getDirectory("Images",{create: true},
                            function(dirEntry) {
                      dirEntry.getFile("Image_"+ new Date().getTime(), {create: true, exclusive: false}, 
                                    function gotFileEntry(fe) {
                            //successful 
                            console.log('got file entry: ',fe);
                            writeFile(fe, dataURLtoBlob($('#collageImage').attr('src')));
                            function writeFile(fileEntry, dataObj, isAppend) {

                              // Create a FileWriter object for our FileEntry (log.txt).
                              fileEntry.createWriter(function (fileWriter) {

                                  fileWriter.onwriteend = function() {
                                      console.log("Successful file write...",fileEntry.toURL());
                                      $('#imgFile').attr('src',fileEntry.toURL());
                                      
                                  };

                                  fileWriter.onerror = function(e) {
                                      console.log("Failed file write: " + e.toString());
                                  };

                                  fileWriter.write(dataObj);
                              });
                          }
                            
                          }, 
                                  function(error) {
                                      console.log("Error getting dummy file!!!!!!!!!!");
                                        
                                }
                                );
                          }
                        );
                 },
                 function() {
                    console.log("Error requesting dummy file");
                    
                   
                  }
                );
        }
        function dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
      }
  $scope.uploadImage = function(){
    

      //var dataURL = $('#actualImage').attr('src');
      var dataURL = document.getElementById('collageImage').src;
      var dataurl = dataURL;
      var blob = dataURLtoBlob(dataurl);
      var fd = new FormData();
      fd.append("file", blob, "image_"+new Date().getTime()+".jpg");

      var json=  {
        "header":
            {   "uuId" : 'appData.uuId',
                "o2SessionId" : 'SESSION2381474809137486'
            }, "body":{
                "treasureHuntId":3,
                "activityId":67,
                "gameId" : 1584,
                "numberOfAttempts" : new Date().getTime()
                }
      }
      fd.append("json",JSON.stringify(json));
        
        console.log('formData: ',fd);
        var req = {
          url: 'http://192.168.1.112:8080/o2core/services/uploadImage',
          method: 'POST',
          headers: {'Content-Type': undefined},
          data: fd,
          transformRequest: function(data, headersGetterFunction) {
            return data; // do nothing! FormData is very good!
            }
        };

        $http(req).then(
          function(success){
          console.log('file uploaded: ',success);
        },
        function(error){
          console.log('upload failed',error);
        })
  }

}])
