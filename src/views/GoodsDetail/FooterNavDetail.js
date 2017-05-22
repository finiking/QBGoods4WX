
import React, { PropTypes } from 'react'
import {Router} from 'dva/router';
import { Icon } from 'ui'

class FooterNavDetail extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleIndexClick = this.handleIndexClick.bind(this);
    this.handleTaobaoClick = this.handleTaobaoClick.bind(this);
  }

  componentDidMount(){

  }

  handleIndexClick () {
    this.context.router.push({pathname:"/IndexPage"});
  }

  handleTaobaoClick () {
    this.props.taobaoCB();
  }

  render () {
    return (
      <div className="footerNavDetail">
        <div className='footerNavDetail-index active' onClick={() => this.handleIndexClick()}>
          <span>回首页</span>
        </div>
        <div className='footerNavDetail-taobao active' onClick={() => this.handleTaobaoClick()}>
          <span>淘口令购买</span>
        </div>
      </div>
    )
  }
}
FooterNavDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default FooterNavDetail
