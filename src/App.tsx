import React from 'react';
import {ScrollList} from './components/ScrollList.tsx';
import 'antd/dist/reset.css';
import styles from './styles/App.module.css';

const App = () => (
    <div className={styles}>
        <h1>GitHub Repositories</h1>
        <ScrollList />
    </div>
);

export default App;