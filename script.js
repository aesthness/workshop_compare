      let leftFontSize = 20;
      let rightFontSize = 20;

      document
        .getElementById("leftFontSelector")
        .addEventListener("change", function () {
          document.getElementById("leftText").style.fontFamily = this.value;
        });
      document
        .getElementById("rightFontSelector")
        .addEventListener("change", function () {
          document.getElementById("rightText").style.fontFamily = this.value;
        });

      function changeFontSize(side, diff) {
        if (side === "left") {
          leftFontSize = Math.max(10, leftFontSize + diff);
          document.getElementById("leftText").style.fontSize =
            leftFontSize + "px";
          document.getElementById("leftFontSizeDisplay").textContent =
            leftFontSize + "px";
        } else {
          rightFontSize = Math.max(10, rightFontSize + diff);
          document.getElementById("rightText").style.fontSize =
            rightFontSize + "px";
          document.getElementById("rightFontSizeDisplay").textContent =
            rightFontSize + "px";
        }
      }
      
      function changeLetterSpacing(side, diff) {
        const input = document.getElementById(side + "LetterSpacingInput");
        let value = parseFloat(input.value) || 0;
        value = Math.round((value + diff) * 10) / 10;
        input.value = value;
        document.getElementById(side + "Text").style.letterSpacing =
          value + "px";
      }

      function changeLineHeight(side, diff) {
        const input = document.getElementById(side + "LineHeightInput");
        let value = parseFloat(input.value) || 1.6;
        value = Math.round((value + diff) * 10) / 10;
        input.value = value;
        document.getElementById(side + "Text").style.lineHeight = value;
      }

      function toggleSpacingPopup(side) {
        const popup = document.getElementById(
          side === "left" ? "LeftspacingPopup" : "RightspacingPopup"
        );
        popup.classList.toggle("hidden");
      }

      function resetFont(side) {
        const wrap = document.querySelector(".wrap");
        const text = document.getElementById(side + "Text");
        wrap.style.width = "1080px";
        wrap.style.height = "720px";
        text.style.fontSize = "20px";
        text.style.letterSpacing = "0px";
        text.style.lineHeight = "1.6";
        text.style.fontFamily = "'Noto Sans KR', sans-serif";
        if (side === "left") {
          leftFontSize = 20;
          document.getElementById("leftFontSizeDisplay").textContent = "20px";
          document.getElementById("leftLetterSpacingInput").value = "0";
          document.getElementById("leftLineHeightInput").value = "1.6";
        } else {
          rightFontSize = 20;
          document.getElementById("rightFontSizeDisplay").textContent = "20px";
          document.getElementById("rightLetterSpacingInput").value = "0";
          document.getElementById("rightLineHeightInput").value = "1.6";
        }
      }

      window.addEventListener("DOMContentLoaded", function () {
        const wrap = document.querySelector(".wrap");
        const leftContainer = document.querySelector(".left-text");
        const rightContainer = document.querySelector(".right-text");
        const leftResizer = document.querySelector(".resizer-left");
        const rightResizer = document.querySelector(".resizer-right");

        function setInitialWidths() {
          const wrapRect = wrap.getBoundingClientRect();
          const half = Math.floor(wrapRect.width / 2);
          leftContainer.style.width = half + "px";
          rightContainer.style.width = wrapRect.width - half + "px";
        }
        setInitialWidths();

        function setupResizer(resizer, target, other, reverse = false) {
          resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            const wrapRect = wrap.getBoundingClientRect();
            const startX = e.clientX;
            const startWidth = target.offsetWidth;

            document.body.style.cursor = "ew-resize";
            function onMouseMove(ev) {
              let dx = reverse ? startX - ev.clientX : ev.clientX - startX;
              let newWidth = startWidth + dx;
              const min = 150;
              const max = wrapRect.width - min;
              newWidth = Math.max(min, Math.min(newWidth, max));
              target.style.width = newWidth + "px";
              other.style.width = wrapRect.width - newWidth + "px";
            }
            function onMouseUp() {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
              document.body.style.cursor = "";
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          });
        }

        setupResizer(leftResizer, leftContainer, rightContainer, true);
        setupResizer(rightResizer, rightContainer, leftContainer, false);

        window.addEventListener("resize", setInitialWidths);
      });
