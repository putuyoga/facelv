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
    console.log('get-face')
}

export function addFace(req, res) {
  if (!req.body.name || !req.body.url) {
    res.status(403).end();
  }

  const newFace = new Face(req.body);

  newface.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json( saved );
  });
}

export function updateFaces(req, res) {
    console.log('upd-faces')
}

export function deleteFace(req, res) {
    console.log('del-faces')
}

export function yayFace(req, res) {
    console.log('yay-faces')
}

export function nayFace(req, res) {
    console.log('nay-faces')
}