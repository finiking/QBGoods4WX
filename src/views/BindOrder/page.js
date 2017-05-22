import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import { NavBar } from 'ui';
import Swipe from "components/swipe/swipe";
import Modal from "components/modal/index";
import PopUp from "components/popup/index";
import { Tabs } from 'ui'
import BindTabs from './BindTabs'
import { Icon } from 'ui';
import Info from "./info";

class BindOrder extends Component {

  tabsConfig = {
    active: "status",
    items: [
      {
        id: "submit",
        name: "提交订单"
      },
      {
        id: "status",
        name: "审核状态"
      },
    ]
  }

  constructor(props) {
    super(props);
    // props.getInitData();
    this.state = {
        tabActive: this.tabsConfig.active,
        items:[],
        isLoading: false,
        oneHeight:false,
        isEnd:false,
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.tabsHandler = this.tabsHandler.bind(this);
    this.toInfo = this.toInfo.bind(this);
  }
  componentDidMount() {
    // this.getData(1);
  }

  componentDidUpdate() {

  }

  touchMove(that,args){
      let {items,isEnd} = this.state;
      let cTop = args[0];
      if(that.min-cTop>30 && !isEnd){
          this.getData(1);
      }
  }
  getData(num , searchParam){
      let {page,items,active,isLoading,isEnd} = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      let param = Object.assign({},{cId: active, page: page,size: 8},searchParam);
      page = param.page;
      return fetchPosts("/api/stuff/goodsList.json",param,"GET").then((data)=>{
              // console.log("data.data.lenght" , data.data.length);
              if(data.responseCode===1000){

                  if(page===1){
                    _this.setState({
                        isLoading:false,
                        page: page + num,
                        active: param.cId,
                        isEnd: data.data.length < 8 ?true:false,
                        items:data.data
                    });
                  }else{
                    _this.setState({
                        isLoading:false,
                        page: page + num,
                        active: param.cId,
                        isEnd:data.data.length < 8 ?true:false,
                        items:items.concat(data.data)
                    });
                  }
              }else{
                   _this.setState({
                      isLoading:false});
              }



       }).catch(function(){
                  _this.setState({
                      isLoading:false,});
       });
  }

  tabsHandler(item){
    this.setState({
      tabActive: item.id
    });
  }
  infoClose(){
    PopUp.hide();
  }
  toInfo(id){
    // Modal.alert("提示", "亲，您好，您的订单已经提交我们会在24小时内，尽快匹配绑定，您可以在匹配状态中查看绑定进度以及状态详情"  );
    let data = {
      rebateStatus: 1
    };
    PopUp.show(
            (<Info data={data} infoClose={this.infoClose} />),{maskClosable:true}
    );
  }
  render() {
    let statusListHeight = document.documentElement.clientHeight -104;
    let props = {
        property:"translateY",
        className:"scroll-warpper",
        tag:"ul",
        min:"auto",
        stopPro:false,
        vertical:true,
        touchMove:this.touchMove
        //step:200
    }
    return (
      <div className="bindorder-container">
        <NavBar title="绑定订单"/>
        <div className="tab-content">
          <BindTabs {...this.tabsConfig} tabsHandler={this.tabsHandler}/>
          <div className={this.state.tabActive === "submit" ? 'submit-pannel tab-pannel pannel-show' : 'submit-pannel tab-pannel'} ref="submit">
            <p className="submit-tip">亲，您好，请输入您的订单号</p>
            <div className="submit-form">
              <div className="submit-form-row">
                <label>订单号</label>
                <input type="text" placeholder="输入订单号"/>
              </div>
              <div className="submit-form-row">
                <label>订单来源</label>
                <select>
                  <option>天猫</option>
                  <option>淘宝</option>
                </select>
                <i className="icon-select-arrow"><Icon name="arrow-down" color="#d2d2d2" size="18" styleName="" /></i>
              </div>
              <div className="submit-form-btn-row">
                <div className="submit-cancel-btn submit-form-btn">取消提交</div>
                <div className="submit-enter-btn submit-form-btn">确认提交</div>
              </div>
              <div className="submit-careful">
                <h3>注意：</h3>
                <p>目前只支持淘宝系商品</p>
                <p>提交订单之后</p>
                <p>如果匹配成功，请在我的订单中查询</p>
                <p>如果无法匹配，会有失败提醒</p>
                <p>同时请加入官方群：2332323</p>
              </div>
            </div>
          </div>
          <div className={this.state.tabActive === "status" ? 'status-pannel tab-pannel pannel-show' : 'status-pannel tab-pannel'} ref="status">
            <div style={{ height: `${statusListHeight}px`}}>
              <Swipe {...props} onClick={this.handClick}>
                <ul>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail" onClick={this.toInfo.bind(this, "item")} >状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
                <li className="status-column">
                  <div className="status-info">
                    <p className="status-order">订单号：11111111</p>
                    <p className="status-date">提交时间：1111111111</p>
                  </div>
                  <div className="status-btn-detail">状态详情</div>
                </li>
              </ul>
              </Swipe>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default CSSModules(BindOrder,styles,{allowMultiple:true});
