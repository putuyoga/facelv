import Face from '../models/face';

export function getFaces(req, res) {
  Face.find().exec((err, faces) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(faces);
  });
}

export function getFace(req, res) {
  var faceId = req.params.faceId;
  Face.find({ _id: faceId }).exec((err, face) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(face);
  });
}

export function addFace(req, res) {
  if (!req.body.name || !req.body.image) {
    res.status(403).json( {message: 'name/image not defined', error: true} )
  } else {
    const newFace = new Face(req.body);
    newFace.save((err, saved) => {
      if (err) {
        res.status(500).json(err);
      }
      res.json(saved);
    });
  }
}

export function updateFaces(req, res) {
  var faceId = req.params.faceId;
  if (!req.body.name || !req.body.image) {
    res.status(403).json({message: 'name/image not defined', error: true})
  } else {
    var updated = {
      name: req.body.name,
      image: req.body.image
    };
    Face.findOneAndUpdate({ _id: faceId }, updated, function(err, face) {
      if (err) {
        res.status(500).json(err);
      }
      res.json(face);
    });
  }
}

export function deleteFace(req, res) {
  var faceId = req.params.faceId;
  Face.findOneAndRemove({ _id: faceId }, function(err) {
    if (err) {
      res.status(500).json({message: err});
    }
    res.json({message: 'delete successful'});
  });
}

export function yayFace(req, res) {
  var faceId = req.params.faceId;
  var update = {$inc: { 'count.yay': 1 }};
  Face.findOneAndUpdate({ _id: faceId }, update, function(err, face) {
    if (err) {
      res.status(500).json(err);
    }
    res.json({message: 'yay\'ed'});
  });
}

export function nayFace(req, res) {
  var faceId = req.params.faceId;
  var update = {$inc: { 'count.nay': 1 }};
  Face.findOneAndUpdate({ _id: faceId }, update, function(err, face) {
    if (err) {
      res.status(500).json(err);
    }
    res.json({message: 'nay\'ed'});
  });
}

export function bestFace(req, res) {
  var pipeline = [
    {
      "$project": {
          "name": "$name",
          "image": "$image",
          "yay": "$count.yay",
          "nay": "$count.nay",
          "total": { "$subtract": [ "$count.yay", "$count.nay" ] }
      }
    },
    {
      "$sort": { "total": -1 }
    },
    {
      "$limit": parseInt( req.params.limit )
    }
];
  Face.aggregate(pipeline, function(err, face) {
    if (err) {
      res.status(500).json(err);
    }
    res.json(face);
  });
}