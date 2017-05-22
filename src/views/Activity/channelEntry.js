import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';
import { priceFormat, eventFun, icons } from 'libs/util'
import { LazyLoader } from 'ui'

class ChannelEntry extends Component {
  pageName = '108'

  banners = [
    require('static/imgs/activity/banner11.png'),
    require('static/imgs/activity/banner12.png'),
    require('static/imgs/activity/banner13.png'),
    require('static/imgs/activity/banner14.png'),
    require('static/imgs/activity/banner15.png'),
    require('static/imgs/activity/banner16.png')
  ]

  constructor(props) {
    super(props)
    this.state = {
      channel: parseInt(props.route.path.match(/(?!ChannelEntry\/)\d/ig)[0])-1
    }
  }

  componentWillMount() {
    // require.ensure([], () => {
    //   let channelData = require('./channelData.js').channelData
    //   let data = channelData[this.state.channel]
    //   this.setState({
    //     data
    //   })
    // })
  }

  render() {
    let { data, channel } = this.state
    if (!data) return
    data.middleList = data.list.slice(0, 6)
    data.list = data.list.slice(6)
    return (
      <div styleName="home-container">
        <ReactSwipe styleName="banner-container" swipeOptions={{ continuous: false }}>
          <div><img src={this.banners[channel]} /></div>
        </ReactSwipe>
        <div styleName="middle-title">{data.firstTitle}</div>
        <div styleName="middle-container">
          {/*style={{ width: `${140 * data.middleList.length}px`}}*/}
          <div styleName="list" >
            {data.middleList.map((item, index) =>
              <div styleName="item" key={index}>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} styleName="img" href={item.url} ><img data-src={item.imgUrl} alt="" /></a>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="price">￥{priceFormat(item.finalPrice)}
                  <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                </div>
                <div styleName="bottom">
                  <span styleName="return">返600宝券</span>
                </div>
                <LazyLoader/>
              </div>
            )}
          </div>
        </div>
        <div styleName="middle-title" style={{marginTop:'10px'}}>{data.secondTitle}</div>
        <div styleName="list-container nomore">
          {data.list.map((item, index) =>
            <div styleName="item" key={index}>
              <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} styleName="img" href={item.url} ><img data-src={item.imgUrl} alt="" /></a>
              <div styleName="right">
                <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="bottom">
                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                    <span styleName="icon"><img src={icons[item.source]} alt="" /></span>
                  </div>
                  <span styleName="return">
                    返600宝券
                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                  </span>
                  <a {...eventFun(this.pageName,'channel_entry_list_products',item.id,)} styleName="btn-buy" href={item.url}>马上购买</a>
                </div>
              </div>
            </div>
          )}
          <LazyLoader 
            lazyConfig={{
              offset: 100,
              throttle: 100
            }}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

ChannelEntry.PropTypes = {
  enterAnimation: {
    duration: 2000,
    animation: 'slideDown'
  },
  leaveAnimation: {
    duration: 2000,
    animation: 'slideUp'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ChannelEntry, styles, {allowMultiple: true}));
