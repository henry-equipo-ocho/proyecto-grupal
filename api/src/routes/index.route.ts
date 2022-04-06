import express, { Router } from 'express';
import morgan from 'morgan';
import activities from './activities.route';
import admin from './admin.route';
import bussines from './bussines.route';
import locations from './locations.route';
import createOrder from './payment.route';
import signin from './signin.route';
import signup from './signup.route';
import token from './token.route';
import userFavorites from './userFavorites.route';
import userUpdate from './userUpdate.route';


const router: Router = Router();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/activities', activities);
router.use('/favorites', userFavorites);
router.use('/update', userUpdate);
router.use('/locations', locations);
router.use('/admin', admin);
router.use('/payment', createOrder);
router.use('/token', token);
router.use('/business', bussines);

export default router;