import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './channelEntry.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, eventFun, icons } from 'libs/util'

class MiddleContainer extends Component {
  pageName = '108'

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    var level0s = this.props.levelData;
    return (
      <div>
        <div styleName="middle-title">{level0s.title}</div>
        <div styleName="middle-container">
          {/*style={{ width: `${140 * level0s.stuffs.length}px`}}*/}
          <div styleName="list" style={{ width: `${140 * level0s.stuffs.length}px`}}>
            {level0s.stuffs.map((item, index) =>
              <div styleName="item" key={index}>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
                <a {...eventFun(this.pageName,'channel_entry_ad_products',item.id)} href={item.url} ><h3>{item.name}</h3></a>
                <div styleName="price">￥{priceFormat(item.finalPrice)}
                  <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                </div>
                <div styleName="bottom">
                  <span styleName="return">{item.rebateValue}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
};
export default CSSModules(MiddleContainer, styles, {allowMultiple: true});
