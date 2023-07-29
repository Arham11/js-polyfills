const trapFocus = (element, prevFocusableElement = document.activeElement) => {
  const focusableEls = Array.from(
    element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    )
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let currentFocus = null;

  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  const handleFocus = (e) => {
    e.preventDefault();
    // if the focused element "lives" in your modal container then just focus it
    if (focusableEls.includes(e.target)) {
      currentFocus = e.target;
    } else {
      // you're out of the container
      // if previously the focused element was the first element then focus the last
      // element - means you were using the shift key
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus();
      } else {
        // you previously were focused on the last element so just focus the first one
        firstFocusableEl.focus();
      }
      // update the current focus var
      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true);

  return {
    onClose: () => {
      document.removeEventListener("focus", handleFocus, true);
      prevFocusableElement.focus();
    },
  };
};

element = document.querySelector(".medical-popup-wrapper");

focusableEls = Array.from(
  element.querySelectorAll(
    'a:not([disabled]), a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  )
);

$(window).on("load", function () {
  // open confirmation pop-up on every refresh
  const confirmMedicalProfessionPopup = function () {
    const professionalPopup = $("#section-professionalPopup");
    professionalPopup
      .closest("#site-section-popup-content")
      .addClass("medical-popup-wrapper");

    if (professionalPopup.length) {
      professionalPopup
        .closest("#site-section-popup-content")
        .css("display", "flex");
      $("body").css({ overflow: "hidden" });
      const focusableEls = Array.from(
        document
          .getElementById("section-professionalPopup")
          .querySelectorAll(
            'a:not([disabled]),a[target] a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
          )
      );

      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      // focus the first element by default
      focusableEls[0].focus();
      let currentFocus = null;
      let i = 0;

      const tabKeyPressed = function (e) {
        if (e.key == "Tab" || e.keyCode == 9) {
          i++;
          console.log(`e.trget ${e.target} ${i}`);
          // if the focused element "lives" in your modal container then just focus it
          if (focusableEls.includes(e.target)) {
            console.log(`e.target,inclues = ${e.target}, ${i}`);
            currentFocus = e.target;
          } else {
            // you're out of the container
            // if previously the focused element was the first element then focus the last
            // element - means you were using the shift key
            if (currentFocus === lastFocusableEl) {
              console.log(
                `currentFocus === lastFocusableE = ${
                  currentFocus === lastFocusableEl
                }, ${i}`
              );
              firstFocusableEl.focus();
            }
            // update the current focus var
            currentFocus = document.activeElement;
            console.log(
              `document.activeElement = ${document.activeElement}, ${i}`
            );
          }
        }
      };

      document.addEventListener("keyup", tabKeyPressed);
    }

    // close popup once user confirms
    $("#section_disclaimer_confirm_btn").click(function () {
      $("body").css({ overflow: "" });
      professionalPopup
        .closest("#site-section-popup-content")
        .css("display", "none");
    });
  };
  confirmMedicalProfessionPopup();
});
