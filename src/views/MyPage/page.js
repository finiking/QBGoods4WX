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
import { FooterNav } from 'ui';
import { ProductList } from 'ui';
import Swipe from "components/swipe/swipe";
import { Icon } from 'ui';

class MyPage extends Component {
  constructor(props) {
    super(props);
    // props.getInitData();

    this.state = {
        items:[],
        page: 1,
        active: 1,
        isLoading: false,
        oneHeight:false,
        isEnd:false,
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }
  componentDidMount() {
    this.getData(1);
  }

  componentDidUpdate() {

  }
  routerHandler(pathname){
    this.context.router.push({"pathname": pathname});
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

  render() {
    let reactSwipe = null, goodsTab = null;
    if(this.props.loadingInit){
      reactSwipe = <ReactSwipe ref="swiper" className="carousel" swipeOptions={{continuous: false, callback: this.swiperCallback}}>
                    {
                      this.props.swipers.map(function(item,i){
                        return (<div key={i}><a {...eventFun("103", 'self_support_banner', item.id)} href={item.linkUrl}><img src={item.imgUrl}/></a></div>)
                      })
                    }
                  </ReactSwipe>;
      goodsTab = <GoodsTab ref="tap" tabCallback={this.tabCallback} active={this.props.tabActive} tabs={this.props.tabs}  eventConfig={{pageName:"103",model:"self_support_tab"}}></GoodsTab>;
    }
    let noDataTip = "--已经到底了--";
    if(this.state.items.length===0){
      noDataTip = "--敬请期待--"
    }
    let noTip = null;
    if(this.state.isLoading){
      noTip = <div className="no-up">--加载中--</div>;
    }else{
      if(this.state.page>=1&&this.state.isEnd===true){
        noTip = <div className="no-up">{noDataTip}</div>;
      }
    }
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
      <div className="my-container">
        <NavBar title="个人中心"/>
        <Swipe  {...props} >
          <div className="login-info">
            <div className="login-name">青春的柠檬</div><div className="login-out">退出</div>
          </div>
          <ul className="my-nav">
            <li className="my-back" onClick={this.routerHandler.bind(this, "/order")}>
              <div className="back-total">
                <p className="back-money">0</p>
                <p>累计返总额</p>
              </div>
              <div className="back-wait">
                <p className="back-money">0</p>
                <p>待返总额</p>
              </div>
              <div className="icon-arrow"><Icon name="arrow-right" color="#b4b4b4" size="14" styleName="" /></div>
            </li>
            <li onClick={this.routerHandler.bind(this, "/BindOrder")}>
              <div>绑定订单</div><div><Icon name="arrow-right" color="#b4b4b4" size="14" styleName="" /></div>
            </li>
            <li onClick={this.routerHandler.bind(this, "/order")}>
              <div>我的订单</div><div><Icon name="arrow-right" color="#b4b4b4" size="14" styleName="" /></div>
            </li>
            <li onClick={this.routerHandler.bind(this, "/MyMoney")}>
              <div>我的余额</div><div><Icon name="arrow-right" color="#b4b4b4" size="14" styleName="" /></div>
            </li>
          </ul>
          <div className="expert-title">
            <div className="line"></div>
            <div className="title">专属推荐</div>
          </div>
          <ProductList listConfig={{temp: 'score'}} listData={this.state.items} eventConfig={{pageName:"103",model:`self_support_${this.state.active}_products`}}/>
          { noTip }
        </Swipe>
        <FooterNav active="my" />
      </div>
    )
  }
};
MyPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return state.mypage;
}

function mapDispatchToProps(dispatch) {
    return {
      getInitData: function(act){
        dispatch({type:"mypage/getGoodsInitData"});
      },
      setSwiperActive: function(act){
        dispatch({type:"mypage/swiperAct",active:act});
      },
      setTabActive: function(act){
        dispatch({type:"mypage/tabAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(MyPage,styles,{allowMultiple:true}));
