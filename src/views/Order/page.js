'use strict'
import * as React from 'react';

//import * as _ from "lodash";

import "./page.less";

import { NavBar } from 'ui';
import List from "./list";
import OrderHead from "./head";
import { eventFun } from 'libs/util'

import {fetchPosts} from "components/common/fetch";

class Order extends React.Component {
    pageName = '109'
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            headInfo:{
                total_rebate_value:0,
                un_rebate_value:0
            },
            status:0
        }
        this.handClick = this.handClick.bind(this);
        this.upData = this.upData.bind(this);
    }
    componentWillMount() {

    }
    componentWillReceiveProps (nextProps) {

    }
    handClick(status) {
        console.log(status);
       this.setState({
           status
       })

    }
    upData(data){
        //debugger
        this.setState({
            headInfo:{
                totalRebateValue:data.totalRebateValue,
                unRebateValue:data.unRebateValue
            }
        });
    }
    render() {
        let {searchParam,headInfo,status} =  this.state;

        let i = 0,j=3,$lis=[];

       while(i<j){

           let sb = Number(i-1);
           i+=1;
           let searchParam = {
           };
           //status:sb<0?undefined:sb
           if(sb>=0){
                searchParam.status =  sb;
           }
           $lis.push(<List upData={this.upData} key={i} searchParam={searchParam}/>);
       }

        return (
            <div className="container-my-order">
                <NavBar title="我的订单"/>
                    <OrderHead status={status} info={headInfo} click={this.handClick}/>
                    {$lis[status]}
            </div>
        )
    }
};

Order.defaultProps = {
}

module.exports = Order;
