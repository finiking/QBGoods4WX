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
import { ProductList } from 'ui';
import Modal from "components/modal/index";
import PopUp from "components/popup/index";
import FooterNavDetail from './FooterNavDetail';
import Swipe from "components/swipe/swipe";
import { Icon } from 'ui';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    // props.getInitData();
    this.state = {
        goodsId: props.params.id,
        items:[],
        page: 1,
        active: 1,
        isLoading: false,
        oneHeight:false,
        isEnd:false,
    }
    this.getData = this.getData.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.taobaoCB = this.taobaoCB.bind(this);
    this.closeClick = this.closeClick.bind(this);
  }
  componentDidMount() {
    this.getData(1);

    let details = this.props.location && this.props.location.state.details;
    // Object.assign(item);
    this.setState({
      details: details
    });
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

  copkeyHandler(){
    console.log(window.copy,window);
    if(window.copy){
      window.copy("dddddd");
      Modal.alert("提示", "复制成功" );
    }else{
      Modal.alert("提示", "一键复制失败，请手动复制淘口令" );
    }
  }

  taobaoCB(){
    let copyAlert = ReactDOM.findDOMNode(this.refs.copyAlert);
    copyAlert.className = "copyKeyAlert alertShow";
  }
  closeClick(){
    let copyAlert = ReactDOM.findDOMNode(this.refs.copyAlert);
    copyAlert.className = "copyKeyAlert";
  }
  render() {
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
    let details = this.state.details || {};

    return (
      <div className="goodsdetail-container">
        <NavBar title="商品详情"/>
        <Swipe  {...props} >
          <div className="goodsdetail">
            <div className="goodsdetail-img">
              <img src={details.imgUrl}/>
            </div>
            <div className="goodsdetail-info">
              <p className="goodsdetail-name">{details.name}</p>
              <div className="goodsdetail-tip">
                <p className="goodsdetail-price">￥{details.price}</p>
                <div className="goodsdetail-back">约返利4元</div>
                <div className="goodsdetail-post">包邮</div>
                <div className="goodsdetail-ticket">20云券</div>
              </div>
            </div>
          </div>
          <div className="expert-title">
            <div className="line"></div>
            <div className="title">相识商品推荐</div>
          </div>
          <ProductList listConfig={{temp: 'score'}} listData={this.state.items} eventConfig={{pageName:"103",model:`self_support_${this.state.active}_products`}}/>
          { noTip }
        </Swipe>
        <div className="copyKeyAlert" ref="copyAlert">
          <div className="copy-warpper animated fadeInUp">
            <div className="copy-close" onClick={() => this.closeClick()}><Icon name="cross" color="#666666" size="18" styleName="" /></div>
            <div className="copy-header">淘口令购买</div>
            <div className="copy-content">
              <div className="copy-edittip">
                长按框内 > 框内 > 复制
              </div>
            </div>
            <div className="copy-btn" onClick={this.copkeyHandler}>一键复制</div>
            <div className="copy-tip">
              <p>点击复制之后，请打开［手机淘宝］购买</p>
              <p>注意：若一键复制失败，请手动复制淘口令</p>
            </div>
          </div>
        </div>
        <FooterNavDetail taobaoCB={this.taobaoCB}/>
      </div>
    )
  }
};
function mapStateToProps(state) {
    return state.goodsdetail;
}

function mapDispatchToProps(dispatch) {
    return {
      getInitData: function(act){
        dispatch({type:"goodsdetail/getGoodsInitData"});
      },
      setSwiperActive: function(act){
        dispatch({type:"goodsdetail/swiperAct",active:act});
      },
      setTabActive: function(act){
        dispatch({type:"goodsdetail/tabAct",active:act});
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(GoodsDetail,styles,{allowMultiple:true}));
