import React from "react";
import MonthKasse from "../core/components/MonthKasse";
import YearKasse from "../core/components/YearKasse";
import { componentToPDFBuffer } from "../core/utils/htmlToPDF";
import fs from "fs";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const filePath = path.resolve(process.cwd(), "public/pdfs");

class PDFPage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const month = query.month;
    const year = query.year;
    const format = query.format;

    let buffer;
    if (month) {
      buffer = isDev
        ? await componentToPDFBuffer(<MonthKasse month={month} clean year={year} />, format)
        : (() => {
            const pdfBuffer = fs.readFileSync(path.join(filePath, `${year}/${month}.pdf`));
            return pdfBuffer;
          })();
    } else {
      buffer = isDev
        ? await componentToPDFBuffer(<YearKasse year={year} />, format)
        : (() => {
            const pdfBuffer = fs.readFileSync(path.join(filePath, `${year}/year.pdf`));
            return pdfBuffer;
          })();
    }
    // with this header, your browser will prompt you to download the file
    // without this header, your browse will open the pdf directly
    res.setHeader("Content-disposition", `attachment; filename="TagesKasse_${month ? month + "_" : ""}${year}.pdf`);

    // set content type
    res.setHeader("Content-Type", "application/pdf");

    // output the pdf buffer. once res.end is triggered, it won't trigger the render method
    res.end(buffer);

    return {};
  }

  render() {
    return <></>;
  }
}

export default PDFPage;
