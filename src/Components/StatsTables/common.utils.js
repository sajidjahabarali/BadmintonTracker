import html2canvas from "html2canvas";
import download from "downloadjs";

export const saveImageButtonHandler = (elementId) => {
  if (elementId) {
    const screenshotTarget = document.getElementById(elementId);
    html2canvas(screenshotTarget, { scale: 0.9 }).then((canvas) => {
      canvas.getContext("2d", {
        willReadFrequently: true,
      });
      const base64image = canvas.toDataURL("image/jpeg");
      download(base64image, elementId + ".jpeg", "image/jpeg");
    });
  }
};

export const renderAndSaveImagesButtonHandler = (
  playerNames,
  idPrefix,
  setRender
) => {
  if (idPrefix) {
    playerNames.forEach((playerName) => {
      const id = idPrefix + playerName;
      const screenshotTarget = document.getElementById(id).children[0];
      console.log(screenshotTarget);
      html2canvas(screenshotTarget, {
        scale: 0.9,
      }).then((canvas) => {
        canvas.getContext("2d", {
          willReadFrequently: true,
        });
        const base64image = canvas.toDataURL("image/jpeg");
        download(base64image, id + ".jpeg", "image/jpeg");
      });
    });
    // setRender(false);
  }
};
