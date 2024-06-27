const items = document.querySelectorAll(".ec__body .ec__item");

const width = document.documentElement.clientWidth;

const isMobile = width <= 768;

const btns = document.querySelectorAll(".ec__btn");
const bodys = document.querySelectorAll(".ec__body");

btns.forEach((btn, index) => {
  btn.onclick = function () {
    document
      .querySelector(".ec__btn-active")
      .classList.remove("ec__btn-active");
    document
      .querySelector(".ec__body-active")
      .classList.remove("ec__body-active");

    btn.classList.add("ec__btn-active");
    bodys[index].classList.add("ec__body-active");
  };
});

items.forEach((item) => {
  const parts = item.querySelectorAll(isMobile ? ".ec__part-m" : ".ec__part");
  const imgs = item.querySelectorAll(".ec__img img");

  let activeIndex = 0;

  if (isMobile) {
    const btnRight = item.querySelector(".ec__btn-right");
    const btnLeft = item.querySelector(".ec__btn-left");
    const dots = item.querySelectorAll(".ec__dot");

    btnRight.onclick = () => {
      if (activeIndex < parts.length - 1) {
        activeIndex++;
      }
      togglePart(
        parts[activeIndex],
        activeIndex,
        imgs,
        item,
        dots,
        btnRight,
        btnLeft
      );
    };

    btnLeft.onclick = () => {
      if (activeIndex > 0) {
        activeIndex--;
      }
      togglePart(
        parts[activeIndex],
        activeIndex,
        imgs,
        item,
        dots,
        btnRight,
        btnLeft
      );
    };
  } else {
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
  }
});

function togglePart(part, index, imgs, item, dots, btnRight, btnLeft) {
  const activePart = item.querySelector(
    isMobile ? ".ec__part-m-active" : ".ec__part-active"
  );
  activePart.classList.remove(
    isMobile ? "ec__part-m-active" : "ec__part-active"
  );
  part.classList.add(isMobile ? "ec__part-m-active" : "ec__part-active");
  const activeImg = item.querySelector(".ec__img-active");
  activeImg.classList.remove("ec__img-active");
  imgs[index].classList.add("ec__img-active");

  if (isMobile) {
    const activeDot = item.querySelector(".ec__dot-active");
    activeDot.classList.remove("ec__dot-active");
    dots[index].classList.add("ec__dot-active");

    if (index === 0) {
      btnLeft.disabled = true;
    } else {
      btnLeft.disabled = false;
    }

    if (index === dots.length - 1) {
      btnRight.disabled = true;
    } else {
      btnRight.disabled = false;
    }
  }
}
