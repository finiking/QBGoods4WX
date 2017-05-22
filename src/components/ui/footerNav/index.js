
import React, { PropTypes } from 'react'
import './index.less'
import {Router} from 'dva/router';
import { Icon } from 'ui'

class FooterNav extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleIndexClick = this.handleIndexClick.bind(this);
    this.handleMyClick = this.handleMyClick.bind(this);
  }

  componentDidMount(){

  }

  handleIndexClick () {
    if(this.props.active === "index") return;
    this.context.router.push({pathname:"/IndexPage"});
  }

  handleMyClick () {
    if(this.props.active === "my") return;
    this.context.router.push({pathname:"/MyPage"});
  }

  render () {
    return (
      <div className="footerNav">
        <div className={this.props.active === "index" ? 'footerNav-index active' : 'footerNav-index'}  onClick={() => this.handleIndexClick()}>
          <Icon name="home3" size="18" styleName="icon" /> <span>首页</span>
        </div>
        <div className={this.props.active === "my" ? 'footerNav-my active' : 'footerNav-my'} onClick={() => this.handleMyClick()}>
          <Icon name="user" size="18" styleName="icon" /> <span>个人中心</span>
        </div>
      </div>
    )
  }
}
FooterNav.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default FooterNav
