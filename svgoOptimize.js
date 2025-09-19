/*
 * @FilePath: \e-learning-educational-case\svgoOptimize.js
 * @Author: chinamobao@gmail.com
 * @Date: 2025-09-18 12:05:42
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-18 22:49:05
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { optimize } from "svgo";

const svgDir = path.join(process.cwd(), "./src/assets/svg");
const optimizeOptions = {
  multipass: true,
  plugins: [
    "preset-default",
    "removeDimensions",
    "removeDeprecatedAttrs",
    "removeTitle",
    "reusePaths",
    {
      name: "conditionalFillStrokeChange",
      type: "perItem",
      fn: () => {
        return {
          element: {
            enter: (node) => {
              if (node.name === "svg") return;
              if (node.attributes?.fill) {
                node.attributes.fill = "currentColor";
              }
              if (node.attributes.stroke) {
                node.attributes.stroke = "currentColor";
              }
            },
          },
        };
      },
    },
  ],
};

function passSvgFile(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const extstring = path.extname(file).toLowerCase();
    const fullPath = path.join(dirPath, file);
    if (extstring === ".svg") {
      const svgStr = fs.readFileSync(fullPath, "utf-8");
      const result = optimize(svgStr, optimizeOptions);
      fs.writeFileSync(fullPath, result.data);
      console.log(`✅ optimized: ${file}`);
    } else {
      passSvgFile(fullPath);
    }
  });
}

passSvgFile(svgDir);
