// Thay đổi nội dung búc thư ở đây
var letterContent = "Gửi chị thúi,\n" +
                   "Nhân dịp 8/3, em chúc chị luôn xinh đẹp, vui vẻ và lúc nào cũng tràn đầy năng lượng tích cực. Mong rằng năm nay sẽ là một năm thật nhiều niềm vui và những điều bất ngờ tốt đẹp đến với chị.\n" +
                   "Em cũng mong là năm nay chị sớm tìm được “nửa kia” của mình để bớt cảnh “ế lâu năm” nhé. Có người đưa đi ăn, đi chơi, cùng chia sẻ những câu chuyện trong cuộc sống thì lúc nào cũng vui hơn nhiều so với việc phải tự mình đi một mình. Nhưng nhớ là có người yêu rồi thì cũng đừng quên đứa em này nhé.\n" +
                   "Chúc chị luôn gặp nhiều may mắn trong cuộc sống, sớm có công việc ổn định, mọi dự định đều suôn sẻ. Quan trọng nhất là lúc nào cũng giữ được nụ cười, sự lạc quan và nguồn năng lượng tích cực nha. Mong rằng mỗi ngày của chị đều là một ngày thật vui và thật ý nghĩa.\n" +
                   "Chúc chị một ngày 8/3 thật hạnh phúc!\n" +
                   "Em của chị,\n" +
                   "Vương Việt Cường - Bầu";

// Tốc độ viết chữ. Số càng nhỏ tốc độ càng nhanh. 50 là tốc độ khá phù hợp
durationWrite = 25

// Hiệu ứng gõ chữ

// function effectWrite () {
//     var boxLetter = document.querySelector(".letterContent")
//     letterContentSplited = letterContent.split("")
    
//     letterContentSplited.forEach((val, index) => {
//         setTimeout(() => {
//             boxLetter.innerHTML += val    
//         }, durationWrite* index)
//     })
// }

function effectWrite() {
    var boxLetter = document.querySelector(".letterContent");
    var letterContainer = document.querySelector(".rightContent");

    if (boxLetter.innerHTML.trim() !== "") return; // Tránh viết lại nhiều lần

    let letterContentSplited = letterContent.split("");

    boxLetter.innerHTML = ""; // Xóa nội dung cũ
    if (letterContainer) {
        letterContainer.scrollTop = 0;
    }

    letterContentSplited.forEach((val, index) => {
        setTimeout(() => {
            boxLetter.innerHTML += val.replace(/\n/g, "<br>"); // Chuyển \n thành <br>
            if (letterContainer) {
                letterContainer.scrollTop = letterContainer.scrollHeight;
            }
        }, durationWrite * index);
    });
}


window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".container").classList.add("active")
    }, 500)
})

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-audio");

    if (!audio) return;

    audio.loop = true;
    audio.autoplay = true;
    audio.playsInline = true;
    audio.preload = "auto";
    audio.volume = 1;

    const tryPlay = () => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
            });
        }
    };

    const primeMutedAutoplay = () => {
        audio.muted = true;
        tryPlay();
    };

    const unlockOnFirstInteraction = () => {
        audio.muted = false;
        tryPlay();
        document.removeEventListener("pointerdown", unlockOnFirstInteraction);
        document.removeEventListener("click", unlockOnFirstInteraction);
        document.removeEventListener("touchstart", unlockOnFirstInteraction);
        document.removeEventListener("keydown", unlockOnFirstInteraction);
    };

    primeMutedAutoplay();

    document.addEventListener("pointerdown", unlockOnFirstInteraction, { once: true });
    document.addEventListener("click", unlockOnFirstInteraction, { once: true });
    document.addEventListener("touchstart", unlockOnFirstInteraction, { once: true });
    document.addEventListener("keydown", unlockOnFirstInteraction, { once: true });
});

var openBtn = document.querySelector(".openBtn")
openBtn.addEventListener("click", () => {
    const audio = document.getElementById("background-audio");
    if (audio) {
        audio.muted = false;
        audio.play().catch(() => {});
    }
    document.querySelector(".cardValentine").classList.add("active")
    document.querySelector(".container").classList.add("close")
})

var cardValentine = document.querySelector(".cardValentine")

cardValentine.addEventListener("click", () => {
    cardValentine.classList.toggle("open")

    if(cardValentine.className.indexOf("open") != -1) {
        const letterContainer = document.querySelector(".rightContent");
        if (letterContainer) {
            letterContainer.scrollTop = 0;
        }
        setTimeout(effectWrite, 500)
    } else {
        setTimeout(() => {
            document.querySelector(".letterContent").innerHTML = ""
            const letterContainer = document.querySelector(".rightContent");
            if (letterContainer) {
                letterContainer.scrollTop = 0;
            }
        }, 1000)
    }
})
