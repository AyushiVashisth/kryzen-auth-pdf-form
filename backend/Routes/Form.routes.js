const express = require("express");
const multer = require("multer");
const path = require("path");
const { formModel } = require("../Models/Form.model");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const formRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single("photo");

formRouter.use(jwtMiddleware);

formRouter.post("/", upload, async (req, res) => {
  try {
    const { age, address } = req.body;
    const userId = req.user.dealerId;
    const fullName = req.user.fullName;
    console.log(age, address, userId, fullName, req.body);

    if (!age || !address) {
      return res.status(400).json({
        msg: "Form validation failed",
        error: "age and address are required fields"
      });
    }
    if (!req.file) {
      return res.status(400).json({
        msg: "Form validation failed",
        error: "photo is a required field"
      });
    }

    const photo = path.join(__dirname, "../uploads", req.file.filename);
    const formData = new formModel({
      userId: userId,
      fullName: fullName,
      age: age,
      address: address,
      photo: photo
    });

    await formData.save();

    res.status(201).json({ msg: "Form submitted successfully", formData: formData });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Something went wrong, please try again",
      error: "Fill the correct information"
    });
  }
});

formRouter.get("/", async (req, res) => {
  try {
    const allFormData = await formModel.find();
    res.status(200).json({ formData: allFormData });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Something went wrong while fetching form data",
      error: err.message
    });
  }
});

formRouter.get("/pdf/:formId", async (req, res) => {
    try {
      const formId = req.params.formId;
      const formData = await formModel.findById(formId);
  
      if (!formData) {
        return res.status(404).json({ msg: "Form not found" });
      }
  
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(res);
      pdfDoc
        .rect(40, 40, 520, 280)
        .stroke()
        .font("Helvetica-Bold")
        .fontSize(18)
        .text("ID Card", { align: "center" });
  
      pdfDoc
        .moveDown(1)
        .font("Helvetica")
        .fontSize(14)
        .text(`Full Name: ${formData.fullName}`, 60, 120)
        .text(`Age: ${formData.age}`, 60, 150)
        .text(`Address: ${formData.address}`, 60, 180)
        .text(`Form ID: ${formId}`, 60, 210);
  
      const photoBorderX = 400;
      const photoBorderY = 120;
      const photoBorderWidth = 150;
      const photoBorderHeight = 181;
      
      const remainingPhotoWidth = photoBorderWidth - 10; 
      pdfDoc.image(formData.photo, photoBorderX + 5, photoBorderY + 5, { width: remainingPhotoWidth });
      pdfDoc.end();
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=custom_card_${formId}.pdf`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error generating PDF", error: error.message });
    }
  });
  

module.exports = { formRouter };
