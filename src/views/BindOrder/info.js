'use strict'
import * as React from 'react';
import { Icon } from 'ui';
import { NavBar } from 'ui';
//import * as _ from "lodash";


import "./info.less";


class Info extends React.Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }

    backHandler(){
      this.props.infoClose();
    }

    render() {
        let {data,onClick} = this.props;
        let statusBack = '';
        switch (data.rebateStatus) {
          case 1:
            statusBack = <li className="info-select">提交订单</li>;
            break;
          case 2:
            statusBack = <li className="info-select">订单匹配中</li>;
            break;
          case 3:
            statusBack = <li className="info-select">匹配成功</li>;
            break;
          default:
            statusBack = <li>返还宝券</li>;
        }
        return (
            <div className="container-bind-order-info">
                <NavBar title="订单详情" backHandler={this.backHandler}/>
                <ol>
                    <li className={data.rebateStatus==-1?"info-select":""}>提交订单</li>
                    <li className={data.rebateStatus==0?"info-select":""}>订单匹配中</li>
                    <li className={data.rebateStatus==1?"info-select":""}>匹配成功</li>
                </ol>
                <div className="container-my-order-tip">
                  <h3>注意</h3>
                  <p>1. 如果遇到问题，欢迎加入有好货官方群：235962440</p>
                </div>
            </div>
        )
    }
};

Info.defaultProps = {
    data:{}
}

module.exports = Info;
//<div className="vi-nav-bar"><span className="left-icon"></span>返券详情</div>
