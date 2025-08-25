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

    // ----------- Upload resume to Google Drive -----------
    const fileMetadata = {
      name: `${name}_Resume${file.originalname.substring(file.originalname.lastIndexOf("."))}`,
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
      supportsAllDrives: true,
    });

    // ----------- Upload metadata JSON to Google Drive -----------
    const metadataJson = {
      name,
      email,
      phone,
      position,
      resumeFileName: uploadedFile.data.name,
      resumeDriveId: uploadedFile.data.id,
      resumeDriveLink: uploadedFile.data.webViewLink,
    };

    const metadataBuffer = Buffer.from(JSON.stringify(metadataJson, null, 2));

    const metadataFile = await drive.files.create({
      resource: {
        name: `${name}_Details.json`,
        parents: [process.env.GOOGLE_FOLDER_ID],
      },
      media: {
        mimeType: "application/json",
        body: Readable.from(metadataBuffer),
      },
      fields: "id, webViewLink, webContentLink",
      supportsAllDrives: true,
    });

    // ----------- Response -----------
    res.status(200).json({
      message: "Upload successful",
      data: {
        name,
        email,
        phone,
        position,
        resume: {
          driveFileId: uploadedFile.data.id,
          driveViewLink: uploadedFile.data.webViewLink,
          driveDownloadLink: uploadedFile.data.webContentLink,
        },
        metadata: {
          driveFileId: metadataFile.data.id,
          driveViewLink: metadataFile.data.webViewLink,
          driveDownloadLink: metadataFile.data.webContentLink,
        },
      },
    });
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = { UploadFile };
