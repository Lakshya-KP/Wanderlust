const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js")
const Review = require("../models/review.js");
const { isLoggedIn, isReviewAuthor,validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


// const validateReview = (req, res, next) => {
//     let {error} = reviewSchema.validate(req.body);
//     if (error) {
//       let errMsg = error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
//   }

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);


module.exports = router;