// const sideMenu = {
//     score: 0,
//     difficulty: localStorage.getItem('difficulty'),
//     init: function() {
//         // sideMenu.startTimer();
//         sideMenu.displayDifficulty(); 
//         sideMenu.countdown.start(180000);  
//         $('#pause').on('click', sideMenu.pauseGame);
//         $('#resume').on('click', sideMenu.resumeGame);
//     },
//     displayDifficulty: function() {
//         $('#difficulty').html(sideMenu.difficulty);
//     },
//     countdown: function () {
//         // Length ms 
//         let timeout = 10000;
//         // Interval ms
//         let timeGap = 1000;   
//         let currentTime = ( new Date() ).getTime();
//         let endTime = ( new Date() ).getTime() + timeout; 
//         let timer = $('#countdown');
//         console.log('timer: ', timer);
//         let pauseButton = $('#pause');
//         let resumeButton = $('#resume').hide();
//         let running = true;
//         let updateTimer = function() {
//             // Run till timeout
//             if (currentTime + timeGap < endTime) {
//                 setTimeout( updateTimer, timeGap );
//             }
//             // countdown if running
//             if (running) {
//                 currentTime += timeGap;
//                 if (currentTime >= endTime) {
//                     timer.css('color','red');
//                     document.location.href = "file:///C:/Users/Damian/Documents/SDA-Project/lose%20screen/index.html";
//                 }
//             }
//             // Update Gui
//             let time = new Date();
//             time.setTime( endTime - currentTime );
//             let Minutes = time.getMinutes();
//             let Seconds = time.getSeconds();
            
//             timer.html( 
//                 (Minutes < 10 ? '0' : '') + Minutes 
//                 + ':' 
//                 + (Seconds < 10 ? '0' : '') + Seconds );
//                 console.log('timer: ', timer.html());
                
//         };
//         let pause = function() {
//             running = false;
//             pauseButton.hide();
//             resumeButton.show();
//         }; 
//         let resume = function() {
//             running = true;
//             pauseButton.show();
//             resumeButton.hide();
//         };
//         let start = function(timeout) {
//             timeout = timeout;
//             currentTime = ( new Date() ).getTime();
//             endTime = ( new Date() ).getTime() + timeout;
//             updateTimer();
//         }
//         return {
//             pause: pause,
//             resume: resume,
//             start: start
//         };
//     }(),
//     pauseGame: function() {
//         sideMenu.countdown.pause()
//         $('#pause').addClass('pauseGame');
//     },
//     resumeGame: function() {
//         sideMenu.countdown.resume();
//         $('#pause').removeClass('pauseGame');
//     },

// }

// sideMenu.init();
