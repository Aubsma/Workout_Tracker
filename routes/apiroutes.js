const router = require("express").Router();
const db = require("../models");
const { json } = require("express");

router.post("/api/workouts", ({data}, res) => {
  db.Workout.create(data)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    db.Workout.findByIdAndUpdate({_id: req.params.id},
        { $push: {exercises : req.body }}, {new: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            //adding all exercises duration together, adding the duration field
            $addFields:{
                totalDuration:{$sum:"$exercises.duration"},
                totalDistance:{$sum: "$exercises.disctance"},
                totalSets:{$sum: "$exercises.sets"},
                totalReps:{$sum: "$exercises.reps"},
                totalWeight:{$sum: "$exercises.weight"},
            }
        }
    ])
    .then(lastWorkout => {
        res.json(lastWorkout);
      })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            //adding all exercises duration together, adding the duration field
            $addFields:{
                totalDuration:{$sum:"$exercises.duration"},
                totalDistance:{$sum: "$exercises.disctance"},
                totalSets:{$sum: "$exercises.sets"},
                totalReps:{$sum: "$exercises.reps"},
                totalWeight:{$sum: "$exercises.weight"},
            }
        },
        {"$limit":7}
    ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
router.delete("/api/workouts", (req, res) => {
    db.Workout.findByIdAndRemove(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;