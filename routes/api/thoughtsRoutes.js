const router = require("express").Router();


const { createThought, createReaction, getSingleThought , getThoughts , deleteThought , deleteReaction } = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createThought);


router.route("/:_id").get(getSingleThought).delete(deleteThought);

router.route("/:_id/reactions").post(createReaction);

router.route("/:_id/reactions/:reactionId").delete(deleteReaction);


module.exports = router;