import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Face from '../face';

// Initial posts added into test db
const faces = [
  new Face({ name: 'putuyp', image: 'http://xa.yz/t.jpg' }),
  new Face({ name: 'gaplp', image: 'http://gl.ca/i.jpg' })
];

test.beforeEach('connect and add two face items', t => {
  Face.create(faces, (err) => {
    if (err) t.fail('Unable to insert faces');
  });
});

test.afterEach.always(t => {
  Face.remove({}, (err) => {
    if (err) t.fail('Unable to delete faces');
  });
});

test.serial('Should correctly give number of Faces', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/faces')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(faces.length, res.body.length);
});


test.serial('Should send correct data when queried against a id', async t => {
  let face = new Face({ name: 'Putu Yoga', image: 'http://putuyoga.com', _id: '57e8a8d4d502c2001117c2c9' });
  face.save();

  const res = await request(app)
    .get('/api/faces/57e8a8d4d502c2001117c2c9')
    .set('Accept', 'application/json');
  t.is(res.status, 200);
  t.is(res.body.name, face.name);
});

test.serial('should correctly add one face', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/faces')
    .send({ name: 'gundul', image: 'awkwarin' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedFace = await Face.findOne({ image: 'awkwarin' }).exec();
  t.is(savedFace.name, 'gundul');
});

test.serial('Should correctly delete a face', async t => {
  t.plan(2);

  let face = new Face({ name: 'Lucifer', image: 'http://pixl.com/img.png', _id: '57e8a8d4d502c2001117c2c8'  });
  face.save();

  const res = await request(app)
    .delete(`/api/faces/${face._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedFace = await Face.findOne({ _id: face._id }).exec();
  t.is(queriedFace, null);
});