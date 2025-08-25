const { google } = require("googleapis");

// Google Drive Authentication
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIALS_PATH, // Secret File path
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

const UploadFile = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // File metadata for Google Drive
    const fileMetadata = {
      name: file.originalname,
      parents: [process.env.GOOGLE_FOLDER_ID],
    };

    // Use buffer directly for upload
    const media = {
      mimeType: file.mimetype,
      body: Buffer.from(file.buffer),
    };

    // Upload file to Google Drive
    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    });

    // Once uploaded, memory buffer is automatically released after function exits

    res.status(200).json({
      message: "Upload successful",
      data: {
        name,
        email,
        phone,
        position,
        file: {
          originalName: file.originalname,
          size: file.size,
          driveFileId: uploadedFile.data.id,
          driveViewLink: uploadedFile.data.webViewLink,
          driveDownloadLink: uploadedFile.data.webContentLink,
        },
      },
    });
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = { UploadFile };