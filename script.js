const items = document.querySelectorAll(".ec__item");

items.forEach((item) => {
  const parts = item.querySelectorAll(".ec__part");
  const imgs = item.querySelectorAll(".ec__img img");

  let activeIndex = 0;

  let timeout = setTimeout(function toggle() {
    togglePart(parts[activeIndex], activeIndex, imgs, item);
    if (activeIndex < parts.length - 1) {
      activeIndex++;
    } else {
      activeIndex = 0;
    }
    timeout = setTimeout(toggle, 1500);
  }, 1500);

  parts.forEach((part, index) => {
    part.addEventListener("click", () => {
      togglePart(part, index, imgs, item);
      clearTimeout(timeout);
    });

    part.addEventListener("mouseover", () => {
      togglePart(part, index, imgs, item);
      clearTimeout(timeout);
    });
  });
});

function togglePart(part, index, imgs, item) {
  const activePart = item.querySelector(".ec__part-active");
  activePart.classList.remove("ec__part-active");
  part.classList.add("ec__part-active");
  const activeImg = item.querySelector(".ec__img-active");
  activeImg.classList.remove("ec__img-active");
  imgs[index].classList.add("ec__img-active");
}
