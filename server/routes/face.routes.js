import { Router } from 'express';
import * as FaceController from '../controllers/face.controller';
const router = new Router();

router.route('/faces').get(FaceController.getFaces);
router.route('/faces/:faceId').get(FaceController.getFace);
router.route('/faces').post(FaceController.addFace);
router.route('/faces/:faceId').put(FaceController.updateFaces);
router.route('/faces/:faceId').delete(FaceController.deleteFace);
router.route('/faces/:faceId/yay').post(FaceController.yayFace);
router.route('/faces/:faceId/nay').post(FaceController.nayFace);
router.route('/faces/best/:limit').get(FaceController.bestFace);
export default router;