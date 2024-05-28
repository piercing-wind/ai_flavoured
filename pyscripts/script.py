import sys
import os
import tempfile
import win32com.client

def convert_pptx_to_pdf(pptx_buffer):
    # Create a temporary PPTX file
    pptx_file = tempfile.mktemp(suffix='.pptx')
    with open(pptx_file, 'wb') as f:
        f.write(pptx_buffer)

    # Create a temporary PDF file
    pdf_file = tempfile.mktemp(suffix='.pdf')

    # Convert the PPTX file to PDF using PowerPoint
    powerpoint = win32com.client.Dispatch("Powerpoint.Application")
    presentation = powerpoint.Presentations.Open(pptx_file)
    presentation.ExportAsFixedFormat(pdf_file, 2)  # 2 stands for PDF format
    presentation.Close()
    powerpoint.Quit()

    # Read the PDF file into a byte buffer
    with open(pdf_file, 'rb') as f:
        pdf_buffer = f.read()

    # Delete the temporary files
    os.remove(pptx_file)
    os.remove(pdf_file)

    return pdf_buffer

if __name__ == "__main__":
    pptx_buffer = sys.stdin.buffer.read()
    pdf_buffer = convert_pptx_to_pdf(pptx_buffer)
    sys.stdout.buffer.write(pdf_buffer)