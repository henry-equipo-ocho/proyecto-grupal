import { Router } from 'express';
import express from 'express';
import morgan from 'morgan';
import signup from './signup.route';
import signin from './signin.route';
import activities from './activities.route';
import userFavorites from './userFavorites.route';
import userUpdate from './userUpdate.route';


const router: Router = Router();

router.use(morgan('dev'));
router.use(express.urlencoded({extended: false}));

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/activities', activities);
router.use('/favorites', userFavorites);
router.use('/update', userUpdate);

export default router;