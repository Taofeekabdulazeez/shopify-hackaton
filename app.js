const btnCollection = document.querySelector(".btn--collection");
const collectionList = document.querySelector(".collections");

const btnNotification = document.querySelector(".btn--bell");
const notifications = document.querySelector(".notifications");

btnNotification.addEventListener("click", function () {
  collectionList.classList.add("hide");
  btnCollection.classList.remove("btn--clicked");

  notifications.classList.toggle("hide");
  btnNotification.classList.toggle("btn--clicked");
});

const panel = document.querySelector(".panel");
const btnArrow = document.querySelector(".btn--arrow");

btnArrow.addEventListener("click", function () {
  panel.classList.toggle("active");
});

const stepPanels = document.querySelectorAll(".step .panel");
const stepPanel = document.querySelector(".step .panel");

// stepPanel.addEventListener("click", function () {
//   this.classList.toggle("active");
//   this.closest(".step").classList.toggle("active");
// });

const checkBox = document.querySelector(".check-box");
const checkBoxes = document.querySelectorAll(".chec-box");
const progressBar = document.querySelector("progress");
const steps = document.querySelector(".steps");

// checkBox.addEventListener("click", function () {
//   checkBox.classList.toggle("checked");
// });

steps.addEventListener("click", function (event) {
  const clickedPanel = event.target.closest(".panel");
  const clickedCheckBox = event.target.closest(".check-box");

  if (clickedCheckBox) {
    if (!clickedCheckBox.closest(".panel").classList.contains("active")) {
      stepPanels.forEach((panel) => {
        // if (panel === clickedPanel) return;
        panel.classList.remove("active");
        panel.closest(".step").classList.remove("active");
      });

      clickedCheckBox.closest(".panel").classList.add("active");
      clickedCheckBox.closest(".step").classList.add("active");
    }

    console.log(clickedCheckBox.ariaLabel);

    clickedCheckBox.classList.toggle("checked");
    console.log(getProgressValue());
    updateProgress();
    setProgressContent();

    if (clickedCheckBox.ariaLabel === "Not done")
      clickedCheckBox.ariaLabel = "Mark as done";
    else clickedCheckBox.ariaLabel = "Marked as not done";

    return;
  }

  if (clickedPanel) {
    stepPanels.forEach((panel) => {
      if (panel === clickedPanel) return;
      panel.classList.remove("active");
      panel.closest(".step").classList.remove("active");
    });

    clickedPanel.classList.toggle("active");
    clickedPanel.closest(".step").classList.toggle("active");

    return;
  }
});

function getProgressValue() {
  const checked = document.querySelectorAll(".checked");

  return checked.length;
}

function setProgressContent() {
  const progressValue = document.querySelector(".progress-text");

  progressValue.textContent = `${getProgressValue()} / 5 completed`;
}

function updateProgress() {
  const progress = document.querySelector("progress");

  progress.setAttribute("value", getProgressValue());
}

const shoppingPanel = document.querySelector(".shopping-panel");
const btnClose = document.querySelector(".btn--close");

btnClose.addEventListener("click", function () {
  shoppingPanel.style.display = "none";
});

const menuItems = document.querySelectorAll('[role="menuitem"]');
const btnOpenMenu = document.querySelector("#btn--collection");
const menu = document.querySelector("#collections");

function openMenu() {
  btnOpenMenu.ariaExpanded = "true";
  menuItems.item(0).focus();

  menu.addEventListener("keyup", handleMenuEscapeKeypress);
  //
  notifications.classList.add("hide");
  btnNotification.classList.remove("btn--clicked");
}

function closeMenu() {
  btnOpenMenu.ariaExpanded = "false";
  btnOpenMenu.focus();
}

function toggleMenu() {
  const isExpanded = btnOpenMenu.attributes["aria-expanded"].value === "true";

  menu.classList.toggle("hide");

  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
}

btnOpenMenu.addEventListener("click", toggleMenu);

function handleMenuEscapeKeypress(event) {
  if (event.key === "Escape") toggleMenu();
}

function handleMenuItemArrowKeyPress(event, menuItemIndex) {
  const isLastMenuItem = menuItemIndex === menuItems.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;

  const nextMenuItem = menuItems.item(menuItemIndex + 1);
  const previousMenuItem = menuItems.item(menuItemIndex - 1);

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      menuItems.item(0).focus();
      return;
    }
    nextMenuItem.focus();
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (isFirstMenuItem) {
      menuItems.item(menuItems.length - 1).focus();
      return;
    }
    previousMenuItem.focus();
  }
}

menuItems.forEach(function (menuItem, menuItemIndex) {
  menuItem.addEventListener("keyup", (event) => {
    handleMenuItemArrowKeyPress(event, menuItemIndex);
  });
});

// btnCollection.addEventListener("click", function () {
//   notifications.classList.add("hide");
//   btnNotification.classList.remove("btn--clicked");

//   collectionList.classList.toggle("hide");
//   btnCollection.classList.toggle("btn--clicked");
// });
