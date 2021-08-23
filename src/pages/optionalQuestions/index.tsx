import * as React from 'react';
import anime from 'animejs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';
const { useState, useEffect } = React;
import './style.css'

const OptionalQuestions: React.FC<RouteComponentProps> = props => {
    return (
        <div className='optional-container'>
            暂无可选问题...
        </div>
    )
}

export default withRouter(OptionalQuestions)