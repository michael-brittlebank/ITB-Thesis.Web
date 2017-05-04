import { Component } from 'react';

class HelperService extends Component {
    static isDevelopment(){
        return process.env.NODE_ENV === 'development';
    }
}

export default HelperService;