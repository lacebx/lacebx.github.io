document.addEventListener("mousemove", function(event) {
  const foxAvatar = document.querySelector(".fox-avatar");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight - 50;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
  const degrees = radians * (180 / Math.PI);
  foxAvatar.style.transform = "translate(-50%, -50%) rotate(" + degrees + "deg)";
});
