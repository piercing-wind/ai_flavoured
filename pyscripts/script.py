import sys
import os
import comtypes.client
from tempfile import NamedTemporaryFile
import base64

def pptx_to_pdf(pptx_path):
    # Prepare a temporary file for the PDF output
    pdf_temp_filename = os.path.splitext(pptx_path)[0] + '.pdf'

    # Convert PPTX to PDF using PowerPoint COM automation
    powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
    powerpoint.Visible = 1

    presentation = powerpoint.Presentations.Open(pptx_path, WithWindow=False)
    presentation.SaveAs(pdf_temp_filename, FileFormat=32)  # 32 for pdf
    presentation.Close()
    powerpoint.Quit()

    # Read the PDF file into a buffer
    with open(pdf_temp_filename, 'rb') as pdf_file:
        pdf_buffer = pdf_file.read()

    # Clean up temporary files
    os.remove(pdf_temp_filename)
    pdf_base64 = base64.b64encode(pdf_buffer).decode()
    
    return pdf_base64

if __name__ == "__main__":
    pptx_path = sys.argv[1]
    pdf_base64 = pptx_to_pdf(pptx_path)
    os.remove(pptx_path)
    print(pdf_base64)


# Example usage:
# pptx_buffer = ... (Get this from your Node.js environment)
# pdf_buffer = pptx_to_pdf_buffer(pptx_buffer)
