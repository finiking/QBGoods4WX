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
        let {data} = this.props;
        let statusBack = '';
        return (
            <div className="container-my-order-info">
                  <NavBar title="返利详情" backHandler={this.backHandler}/>
                    <ol>
                        <li className={data.rebateStatus==1?"info-select":""}>匹配订单（成功）</li>
                        <li className={data.rebateStatus==2?"info-select":""}>待结算</li>
                        <li className={data.rebateStatus==3?"info-select":""}>返利成功</li>
                    </ol>
                    <div className="order-info-content">
                        <p><label>商城：</label>{data.source||""}</p>
                        <p><label>下单时间：</label>{data.orderTime||""}</p>
                        <p><label>订单编号：</label>{data.orderNo||""}</p>
                        <p><label>此订单实际支付金额：</label>{data.amount||""}</p>
                        <p><label>此订单实际返利：</label>{data.rebateValue||""}</p>
                    </div>
                    <div className="container-my-order-tip">
                      <h3>返券规则</h3>
                      <p>1.在有好货完成购买结算成功之后，会获得相应的宝券。</p>
                      <p>2.若在有好货加入购物车之后，退出有好货，去淘宝完成购物，买家确认收货之后，立即返券。</p>
                      <p>3.天猫积分、天猫点券、天猫分期付款、信用卡分期付款、余额宝、蚂蚁花呗、集分宝抵扣部分仍可结算返利，淘金币、店铺优惠券等抵扣部分无返券如果遇到问题，欢迎加入有好货官方群：235962440。</p>
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
