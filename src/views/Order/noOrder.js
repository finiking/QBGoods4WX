'use strict'
import * as React from 'react';

//import * as _ from "lodash";





class NoOrder extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        
        return (
            <div className="container-no-order">
                <div></div>
                <p>亲，购物才会返宝券哟</p>
                <a href="newTab://goodstuff.qbao.com/search">立即前去</a>
            </div>
        )
    }
};

NoOrder.defaultProps = {
}

module.exports = NoOrder;


