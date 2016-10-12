import { Router } from 'express';
import passport from 'passport';
import * as FaceController from '../controllers/face.controller';
const router = new Router();
const authenticate = passport.authenticate('jwt', { session: false});

router.route('/faces').get(FaceController.getFaces);
router.route('/faces/:faceId').get(FaceController.getFace);
router.route('/faces/best/:limit').get(FaceController.bestFace);

// protected endpoint
router.route('/faces').post(authenticate, FaceController.addFace);
router.route('/faces/:faceId').put(authenticate, FaceController.updateFaces);
router.route('/faces/:faceId').delete(authenticate, FaceController.deleteFace);
router.route('/faces/:faceId/yay').post(authenticate, FaceController.yayFace);
router.route('/faces/:faceId/nay').post(authenticate, FaceController.nayFace);

export default router;