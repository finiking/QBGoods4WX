import React,{ Component } from 'react'
import * as ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules'
import styles from './page.less'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat, eventFun } from 'libs/util'
import { fetchPosts } from "components/common/fetch"
import { NavBar } from 'ui';

class MyMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    }
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {

  }
  getData(){
      let isLoading = this.state;

      if(isLoading){
          return;
      }
      this.setState({
          isLoading:true
      })
      let _this = this;
      return fetchPosts("/api/stuff/goodsList.json", {},"GET").then((data)=>{
              // console.log("data.data.lenght" , data.data.length);
              if(data.responseCode===1000){
                _this.setState({
                    isLoading:false
                });
              }else{
                   _this.setState({
                      isLoading:false});
              }
       }).catch(function(){
                  _this.setState({
                      isLoading:false,});
       });
  }

  render() {

    return (
      <div className="my-money-container">
        <NavBar title="我的余额"/>
        <div className="my-money-content">
          <div>
            <p className="my-money-tip">可用余额</p>
            <p className="my-money-text">33333.3333</p>
          </div>
        </div>
        <div className="my-money-pull">去提现</div>
      </div>
    )
  }
};
export default CSSModules(MyMoney,styles,{allowMultiple:true});
