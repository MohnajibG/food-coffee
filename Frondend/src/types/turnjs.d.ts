/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/react-pdf.d.ts
declare module "react-pdf" {
  export const pdfjs: any;
  export const Document: any;
  export const Page: any;
  export default { pdfjs: pdfjs, Document: Document, Page: Page };
}
