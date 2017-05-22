import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun, icons } from 'libs/util'

class ListContainer extends Component {
  pageName = '108'

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    var level1s = this.props.levelData;
    return (
      <div>
        <div styleName="middle-title" style={{marginTop:'10px'}}>{level1s.title}</div>
        <div styleName="list-container nomore">
          {level1s.stuffs.map((item, index) =>
            <div styleName="item" key={index}>
              <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
              <div styleName="right">
                <a {...eventFun(this.pageName,'channel_entry_list_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="bottom">
                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                    <span styleName="icon"><img src={icons[item.source]} alt="" /></span>
                  </div>
                  <span styleName="return">
                    {item.rebateValue}
                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                  </span>
                  <a {...eventFun(this.pageName,'channel_entry_list_products',item.id,)} styleName="btn-buy" href={item.url}>马上购买</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
};
export default CSSModules(ListContainer, styles, {allowMultiple: true});
