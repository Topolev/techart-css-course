$(function () {

    $(".video").each(function () {

            console.log(this);

            console.log($(this).find(".video__play-pause"));

            var playButton = $(this).find(".video__play-pause");
            var mainPlayButton = $(this).find(".video__main-play");

            var sound = $(this).find(".video__sound");
            var seekProgress = $(this).find(".video__seek-progress");

            var seekBar = $(this).find(".video__seek-bar");


            var video = $(this).find(".video__source").get(0);

            function changeState() {
                if (video.paused == true) {
                    // Play the video
                    video.play();

                } else {
                    // Pause the video
                    video.pause();
                }
                mainPlayButton.toggle("video__main-play--hide");
            }

            playButton.click(function () {
                changeState();
            });

            mainPlayButton.click(function () {
                changeState();
            });

            sound.click(function(){
                video.muted = !video.muted;
                sound.toggleClass("video__sound--no");
            });

            video.addEventListener("ended", function () {
                console.log("fire-ended");
                mainPlayButton.toggle("video__main-play--hide");
            });

            if (seekBar.length != 0) {
                video.addEventListener("timeupdate", function () {
                    // Calculate the slider value
                    var value = (100 / video.duration) * video.currentTime;

                    // Update the slider value
                    seekBar.get(0).value = value;
                    seekProgress.css("width", video.currentTime * 100 / video.duration + "%")

                });


                seekBar.change(function () {
                    // Calculate the new time

                    var time = video.duration * (seekBar.get(0).value / 100);
                    console.log(seekBar.get(0).value, time);


                    // Update the video time
                    console.log("cureentTIme", video.currentTime);
                    video.currentTime = time;
                    console.log("cureentTIme", video.currentTime);
                });
            }


        }
    )

});


