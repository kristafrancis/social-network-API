const { Thought, User } = require('../models');

const thoughtController = {
//get all thoughts
getAllThought(req, res) {
   Thought.find({})
   .select('-__v')
   .sort({ _id: -1 })
   .then(dbThoughtData => res.json(dbThoughtData))
   .catch(err => {
     console.log(err);
     res.sendStatus(400);
   });
},

//get single thought by id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


//create new thought
createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log (body)
        return User.findOneAndUpdate(
          { _id: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


//update thought by Id
updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $set: body },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

//delete thought by Id
deleteThoughtById({ params }, res) {
    Thought.findOneAndDelete(
        { _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'Your thought has been deleted!' });
        }
        return User.findOneAndUpdate(
            { thoughts: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
//create reaction stored in a single thoughts array field
createReaction(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    {$push: {reactions: req.body}},
    {new: true, runValidators: true}
  )
  .then(dbReactionData => {
    if(!dbReactionData){
      res.status(404).json({ message: 'No reaction found'});
      return;
    }
    res.json(dbReactionData);
  })
  .catch(err => res.json(err));
},


//delete reaction by reactions Id
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    {$pull: {reactions: {reactionId: req.params.reactionId}}},
    {new: true}
  )
  .then(dbReactionData => {
    if(!dbReactionData){
      res.status(404).json({ message: 'No reaction found'});
      return;
    }
    res.json(dbReactionData);
  })
  .catch(err => res.json(err));
}
};

module.exports = thoughtController;

