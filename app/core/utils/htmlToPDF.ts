import { renderToStaticMarkup } from "react-dom/server";
import pdf from "html-pdf";
export type PageSize = "A4" | "A5";
export const componentToPDFBuffer = (component, format: PageSize) => {
  const path = require("path");
  return new Promise((resolve, reject) => {
    const html = renderToStaticMarkup(component);
    pdf
      .create(html, {
        format,
        orientation: "portrait",
        border: {
          left: "15mm",
          top: "5mm",
          bottom: "5mm",
          right: "5mm",
        },
        phantomPath: path.resolve(process.cwd(), "node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs"),
        type: "pdf",
        timeout: 30000,
      })
      .toBuffer((err, buffer) => {
        if (err) {
          return reject(err);
        }
        return resolve(buffer);
      });
  });
};
