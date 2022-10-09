const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent thought's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

  const ThoughtSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true
      },
      thoughtText: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReactionSchema to validate data for a reply
      reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  
  // get total count of thoughts and reactions on retrieval
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;