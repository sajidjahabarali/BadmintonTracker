import html2canvas from "html2canvas";
import download from "downloadjs";

export const saveImagesButtonHandler = ({ elementId, elementClassNames }) => {
  if (elementId) {
    console.log(elementId);
    const screenshotTarget = document.getElementById(elementId);
    console.log(screenshotTarget);
    html2canvas(screenshotTarget, { scale: 0.9 }).then((canvas) => {
      canvas.getContext("2d", {
        willReadFrequently: true,
      });
      const base64image = canvas.toDataURL("image/jpeg");
      download(base64image, elementId + ".jpeg", "image/jpeg");
    });
  }

  elementClassNames.forEach((element) => {
    const screenshotTargets =
      document.getElementsByClassName(elementClassNames);
    // console.log(screenshotTargets);
    Array.from(screenshotTargets).forEach((screenshotTarget) => {
      html2canvas(screenshotTarget, { scale: 0.9 }).then((canvas) => {
        canvas.getContext("2d", {
          willReadFrequently: true,
        });
        const base64image = canvas.toDataURL("image/jpeg");
        download(base64image, element + ".jpeg", "image/jpeg");
      });
    });
  });
};
