const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// router
//   .route("/:id")
//   .get(wrapAsync(listingController.showListings))
//   .put(
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )
//   .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route
router.get("/:id", wrapAsync(listingController.showListings));

// Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
