
const socket = io();

const replymsg = document.querySelector(".replymsg");
const inputmsg = document.querySelector(".inputmsg_text");
const inputmsgForm = document.querySelector(".inputmsg");

function copyFunc() {
  if(replymsg.value != ''){
    navigator.clipboard.writeText(replymsg.value);
    alert("Copied!");
  }
}

inputmsgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputmsg.value) {
    return;
  }
  socket.emit("inputmsg", inputmsg.value);
});

socket.on("reply", function (data) {
  console.log(data);
  replymsg.value = data;
});
