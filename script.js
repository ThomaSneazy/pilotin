window.addEventListener(
  "load",
  (event) => {
    const $observedElement = document.querySelector("#observed-target");
    const $elementToModify = document.querySelector("#image-to-scale");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList(20),
    };
    const handleChangeImageOnIntersectEvent = changeElementOnIntersectEvent(
      $elementToModify
    );
    createObserver($observedElement, handleChangeImageOnIntersectEvent, options);
  },
  false
);

function buildThresholdList(numSteps) {
  const thresholds = [];

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function changeElementOnIntersectEvent(elementToModify) {
  return function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.618) {
        elementToModify.style.transform = `scale(${entry.intersectionRatio})`;
        elementToModify.style.filter = `grayscale(${
          1 - entry.intersectionRatio
        })`;
      }
    });
  };
}

function createObserver(observedElement, handleIntersect, options) {
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(observedElement);
}
