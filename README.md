# Webpage to PDF

A simple webservice that turns webpages into pdf's using the headless Chrome API.

## Description

The API takes a webpage as input and turns it into a PDF file in the same way that Chrome does it when you save a page as a PDF.

## Usage

The following query parameters can be passed:

- **url** — The url to capture.
- **margin** — Paper margins, defaults to none.
- **printBackground** — Print background graphics. Defaults to false. Useful when you want `background-image` styles to be printed.
- **pageRange** — Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
- **displayHeaderFooter** — Display header and footer. Defaults to `false`.
- **landscape** — Paper orientation. Defaults to `false`.
- **download** — Prompt download. Defaults to `false`.
- **filename** — When `?download=true` is applied, the filename is by default `download.pdf`. You can change this by passing `?filename=random_filename.pdf` another filename.

**Example urls:**

- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&margin=0](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&margin=0)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&pageRanges=1-2](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&pageRanges=1-2)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&landscape=true&displayHeaderFooter=true](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&landscape=true&displayHeaderFooter=true)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/1/](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/1/)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/2/](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/2/)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/3/](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/3/)
- [https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&margin=0&download=true&filename=fancy_filename.pdf](https://api.sublayer.io/webpage-to-pdf/pdf?url=https://api.sublayer.io/webpage-to-pdf/examples/4/&printBackground=true&margin=0&download=true&filename=fancy_filename.pdf)