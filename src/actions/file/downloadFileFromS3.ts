export const downloadFileFromS3 = async (fileKey: string) => {
  try {
    const url = `${process.env.CLOUUDFRONT_URL_AWS}/${fileKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("File not found");
    }

    const buffer = await response.arrayBuffer();

    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};