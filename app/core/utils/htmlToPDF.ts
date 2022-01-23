import { renderToStaticMarkup } from "react-dom/server";
import pdf from "html-pdf";
export type PageSize = "A4" | "A5";
export const componentToPDFBuffer = (component, format: PageSize) => {
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
