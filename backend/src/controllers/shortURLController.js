import { nanoid } from "nanoid";

import ShortURL from "../models/shorturl.model.js";

const generateShortURLController = async (req, res) => {
  console.log(req.body);

  const longURL = req.body.originalUrl;

  if (!longURL) {
    console.error("Long URL not provided in the request body.");
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: "Long URL is required",
    });
  }

  const shortURL = nanoid(10); // Generate a short URL using nanoid

  const newShortURL = new ShortURL({
    originalUrl: longURL,
    shortCode: shortURL,
  });

  await newShortURL.save();

  console.log("Generating short URL for:", req.body);
  res.status(200).json({
    status: "success",
    message: "Short URL generated successfully",
    data: {
      shortURL: shortURL,
      longURL: longURL,
    },
  });
};

const getShortURLController = async (req, res) => {
  const { shortURL } = req.params;

  if (!shortURL) {
    console.error("Short URL not provided in the request parameters.");
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: "Short URL is required",
    });
  }

  try {
    const urlRecord = await ShortURL.findOne({ shortCode: shortURL });
    if (!urlRecord) {
      console.error("Short URL not found in the database.");
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }
    console.log("Redirecting to original URL:", urlRecord.originalUrl);
    res.redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error fetching short URL from the database:", error);
    res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error fetching short URL",
    });
  }
};

export { generateShortURLController, getShortURLController };
