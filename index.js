import React from 'react';
import { render } from 'react-dom';
import Images  from './src/components/Images';
import './src/css/style.css'

let brakePoints = [350, 500, 750];
const app =document.getElementById('app');


render(<Images brakePoints={brakePoints}/>,app);
