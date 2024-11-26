import mongoose from "mongoose";

const DictionarySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    partOfSpeech: {
      type: String,
      enum: [
        "noun",
        "verb",
        "adjective",
        "adverb",
        "pronoun",
        "preposition",
        "conjunction",
        "interjection",
        "determiner",
      ],
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    examples: {
      type: String,
    },
    synonyms: {
      type: [String],
      default: [],
    },
    antonyms: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Dictionary =
  mongoose.models.Dictionary || mongoose.model("Dictionary", DictionarySchema);

export default Dictionary;
