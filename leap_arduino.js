"use strict";

var Cylon = require("cylon");

var hand;
var yaw = 0;
var pitch = 0;
var options = { enableGestures: true};

Cylon.robot({
  connections: [{name: 'leapmotion', adaptor: 'leapmotion', port:'127.0.0.1'},
  {name: 'arduino', adaptor: 'firmata', port: 'COM5'}],
  devices: [{name: 'leapmotion', driver: 'leapmotion', connection: 'leapmotion'},
    {name: 'motor1', driver: 'motor', pin: 3, connection: 'arduino'},
    {name: 'motor2', driver: 'motor', pin: 5, connection: 'arduino'}
    ],

    
    work: function(my) {

      var speed = 0;

      my.leapmotion.on("frame", function(frame) {
      
        if(frame.hands.length === 1){
          hand = frame.hands[0];

          yaw = hand.yaw();
          pitch = hand.pitch();

          console.log('pitch : ' + pitch.toFixed(9) + 
                  '    yaw : ' + yaw.toFixed(9));
          // 앞 뒤
          if(pitch >0.5 && pitch < 1){ // 전진
            my.motor1.speed(255);
            my.motor2.speed(255);
          }
          // 회전
          else if(yaw > -2 && yaw < -0.7){ // 좌회전
            my.motor1.speed(0);
            my.motor2.speed(255);
          }
          else if(yaw <2 && yaw >0.7 ){ // 우회전
            my.motor1.speed(255);
            my.motor2.speed(0);
          }
          else if(pitch<0.5){
            my.motor1.speed(0);
            my.motor2.speed(0);
          }

        }
        if(frame.hands.length === 0){

            my.motor1.speed(0);
            my.motor2.speed(0);
          
        }
    });
  }
}).start();


