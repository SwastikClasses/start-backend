const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchuser");

const Notes = require("../models/Notes");

router.get("/", (req, res) => {
  res.json({
    status: 200,
    data: {
      message: "Vohooo! Working!",
    },
  });
});

//Fetch All notes /api/notes/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json(allNotes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured ");
  }
});

//Insert notes /api/notes/fetchnotes
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must be atleast 5 char").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 char").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Some Error Occured ");
    }
  }
);

//Update a note /api/notes/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const note_id = req.params.id;

  if (!note_id) return res.status(404).send("Note Id not present");
  try {
    const { title, description, tag } = req.body;

    const newnote = {};

    if (title) newnote.title = title;
    if (description) newnote.description = description;
    if (tag) newnote.tag = tag;

    let note = await Notes.findOne({ id: note_id });

    if (!note) return res.status(404).send("Note Not Found");
    if (note.user.toString() != req.user.id) {
      return res.status(404).send("Not allowed");
    }

    note = await Notes.findOneAndUpdate(
      note_id,
      { $set: newnote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured ");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const note_id = req.params.id;
  // console.log(note_id);

  if (!note_id) return res.status(404).send("Note Id not present");

  try {
    const { title, description, tag } = req.body;

    let note = await Notes.findOne({ id: note_id });

    if (!note) return res.status(404).send("Note Not Found");

    if (note.user.toString() != req.user.id) {
      // console.log("if " + note.user.toString() + " req.user is " + req.user.id);
      return res.status(404).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(note_id);

    res.json({ Message: "Successfully deleted note" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured");
  }
});
module.exports = router;
