# PDF to PNG Converter

This project converts all pages of a given PDF file into PNG images and stores them in a directory named after the PDF file. Each page of the PDF is saved as a separate PNG image with a naming convention of `pdfname_1.png`, `pdfname_2.png`, and so on.

## Features
- Converts each page of a PDF into a separate PNG image.
- Automatically creates an output directory for each PDF.
- Supports both Node.js libraries and external tools for conversion.

## Prerequisites
- Node.js (v14 or later)
- (Optional) [Poppler-utils](https://poppler.freedesktop.org/) for CLI-based conversion

## Setup

### Install Dependencies
Run the following command to install necessary Node.js modules:
```bash
npm install
```
