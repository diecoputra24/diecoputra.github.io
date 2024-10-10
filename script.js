const btnView = document.querySelector(".view");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

btnView.addEventListener("click", () => {
  document.body.classList.add("view");

  audioIconWrapper.style.display = "flex";
  playAudio();
});

function playAudio() {
  song.volume = 0.1;
  song.play();
  isPlaying = true;
}

audioIconWrapper.addEventListener("click", () => {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-play-circle");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-play-circle");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
});

// INPUT COMMENTS
const getName = document.querySelector("#nama");
const getComment = document.querySelector("#ucapan");
const getAttendance = document.querySelector("#hadir");
const btnComment = document.querySelector(".btn-save");
const timestamp = document.querySelector("#timestamp");

btnComment.addEventListener("click", (e) => {
  e.preventDefault();
  let container = document.querySelector(".hasil");
  let result = container.innerHTML;

  function addTimestamp(ts) {
    const time = new Date();
    const formatDate = time.toLocaleString("id-ID");
    timestamp.value = formatDate;
    ts = timestamp.value;

    const selisih = Math.floor((Date.now() - ts) / 1000);
    const menit = Math.floor(selisih / 60);
    const jam = Math.floor(menit / 60);
    const hari = Math.floor(jam / 24);
    return `${
      hari
        ? hari + " hari yang lalu"
        : jam
        ? jam + " jam yang lalu"
        : menit
        ? menit + " menit yang lalu"
        : "baru saja"
    }`;
    // return timestamp.value;
  }

  function icons() {
    if (getAttendance.value == "1") {
      return `<i class="bi bi-patch-check-fill text-success"></i>`;
    } else if (getAttendance.value == "0") {
      return `<i class="bi bi-patch-minus-fill text-danger"></i>`;
    }
  }

  if (getName.value == "") {
    alert("nama harus diisi");
  } else if (getComment.value == "") {
    alert("comment tidak boleh kosong");
  } else if (getAttendance.value !== "0" && getAttendance.value !== "1") {
    alert("harap isi kehadiran");
  } else {
    result += `<h4> ${getName.value} ${icons()} </h4>
    <p>
    ${getComment.value}
    </p>
    <div class="timestamp">
    <i class="bi bi-alarm"> ${addTimestamp()}</i>
    </div>
  </div>`;
    container.innerHTML = result;
  }
});

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const namaTamu = document.querySelector(".hero h3 span");
document.querySelector(".rsvp #nama").value = nama;
namaTamu.innerHTML = nama;

const iconCopy = document.querySelectorAll(".number-container p .bi-copy");
const switchIcon = document.querySelectorAll(".number-container p i");

iconCopy.forEach((icon) => {
  icon.addEventListener("click", function () {
    const textCopy = icon.parentElement.textContent.trim();
    navigator.clipboard
      .writeText(textCopy)
      .then(() => {
        try {
          icon.classList.remove("bi-copy");
          icon.classList.add("bi-check");

          setTimeout(() => {
            icon.classList.remove("bi-check");
            icon.classList.add("bi-copy");
          }, 5000);
        } catch (err) {
          alert("gagal merubah icon");
        }
      })
      .catch((err) => alert("gagal menyalin text"));
  });
});
