const { google } = require("googleapis");
const { Readable } = require("stream");

// Google Auth
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIALS_PATH,
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

    const fileMetadata = {
      name: file.originalname,
      parents: [process.env.GOOGLE_FOLDER_ID],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer), // Upload directly from memory
    };

    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true, // ✅ required for shared My Drive folders
    });

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
