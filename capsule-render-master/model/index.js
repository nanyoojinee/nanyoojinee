import normalModels from "./normalModel/index";
import animationModels from "./animationModel";

import { isGradientColor } from "../src/verification";

const models = {
  ...normalModels,
  ...animationModels,
};

const Model = {
  getModel: type => {
    if (models.hasOwnProperty(type)) {
      return models[type];
    } else {
      throw new Error(`The value of 'type=${type}' is invalide.`);
    }
  },

  style: function (section, fontSize = "70", descSize = 20, rotate = 0) {
    let css = `.text {
						font-size: ${fontSize}px;
						font-weight: 700;
						font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
					}
					.desc {
						font-size: ${descSize}px;
						font-weight: 500;
						font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
					}`;

    if (rotate !== 0)
      css += `.text, .desc {
						transform-origin: center center;
						transform:rotate(${rotate}deg);
					}`;

    if (section === "footer")
      css += `path {
						transform: rotate(180deg);
						transform-origin: 50% 50%;
					}`;

    return css;
  },
  gradientDef: function (color) {
    if (!isGradientColor(color)) return "";

    const offset = Object.entries(color)
      .map(([key, value]) => `<stop offset="${key}%" stop-color="#${value}"/>`)
      .join("");

    return `<defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                ${offset}
              </linearGradient>
            </defs>`;
  },
  textBg: function (bgColor, posX, posY, fontHeight, text) {
    // 40 : padding value
    const height = Number(fontHeight) + 40;
    // 0.5 : temp sizing.
    const width = text.length * Number(fontHeight) * 0.5 + 40;
    return `
        <rect fill="#${bgColor}" height="${height}" width ="${width}" x="${posX}%" y="${posY}%" transform="translate(-${
          width / 2
        }, -${height / 2})"  rx ="25" ry ="25" />
        `;
  },
  animation: function (animation, fontAlign, fontAlignY) {
    if (!animation) return "";

    let css = "";
    switch (animation) {
      case "fadeIn":
        css += `.text, .desc {
							animation: fadeIn 1.2s ease-in-out forwards;
						}`;
        css += `@keyframes fadeIn {
						  from {
							opacity: 0;
						  }
						  to {
							opacity: 1;
						  }
						};`;
        break;
      case "scaleIn":
        css += `.text, .desc {
							animation: scaleIn .8s ease-in-out forwards;
						}`;
        css += `@keyframes scaleIn {
						  from {
							transform: translate(${fontAlign}%, ${fontAlignY}%) scale(0);
						  }
						  to {
							transform: translate(0%, 0%) scale(1);
						  }
						};`;
        break;
      case "blinking":
        css += `.text, .desc {
							animation: blinking 1.6s step-start 0s infinite;
						}`;
        css += `@keyframes blinking {
						  50% {
							opacity: 0;
						  }
						};`;
        break;
      case "blink":
        css += `.text, .desc {
							animation: blink .6s step-start 0s backwards;
						}`;
        css += `@keyframes blink {
						  10% { opacity: 1; }
						  25% { opacity: 0; }
						  40% { opacity: 1; }
						  55% { opacity: 0; }
						  70% { opacity: 1; }
						  85% { opacity: 0; }
						};`;
        break;
      case "twinkling":
        css += `.text, .desc {
							animation: twinkling 4s ease-in-out infinite;
						}`;
        css += `@keyframes twinkling {
						  40% { opacity: 1; }
						  50% { opacity: 0.5; }
						  60% { opacity: 1; }
						  70% { opacity: 0.5; }
						  80% { opacity: 1; }
						};`;
        break;
      default:
        throw new Error(`The value of 'animation=${animation}' is invalide.`);
    }

    return css;
  },
};

export default Model;
