import { Router } from 'express';
import express from 'express';
import morgan from 'morgan';
import signup from './signup.route';


const router = Router();

router.use(morgan('dev'));
router.use(express.urlencoded({extended: false}));

router.use('/signup', signup);

export default router;