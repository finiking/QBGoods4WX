import React, {Component, PropTypes} from 'react'
import * as ReactDOM from 'react-dom'
import AlloyTouch from './alloyTouch2'
import Transform from './transform2'

class Swipe2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isShowLoad:true
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isShowLoad!==undefined&&nextProps.isShowLoad!==this.state.isShowLoad){
      this.setState({
        isShowLoad:nextProps.isShowLoad
      })
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.alloyTouch || this.scrollInit()
    }, 0)
  }

  componentDidUpdate(prevProps,prevState){
    let { min,vertical } = this.props
    let { property } = this.props.option
    if(min==="auto"&&this.alloyTouch&&vertical===true&&property==="translateY"){
      let touch = ReactDOM.findDOMNode(this.refs.touch)   
      let target = ReactDOM.findDOMNode(this.refs.target)
      let length = -(target.clientHeight-touch.clientHeight)
      this.alloyTouch.min = length>0?0:length
    }
  }

  scrollInit = () => {
    let touch = ReactDOM.findDOMNode(this.refs.touch)
    let target = ReactDOM.findDOMNode(this.refs.target)
    Transform(target)
    let { min, touchMove, vertical, intervals, initCallback} = this.props
    let prevTarget = false

    if(min==="auto"){
        min = -((vertical===false?target.offsetWidth:target.offsetHeight)-(vertical===false?touch.offsetWidth:touch.offsetHeight))
        min = min > 0 ? 0 : min
    }
    let option = Object.assign({
      onClick:function(){
      },
      property:"translateX",
      width:false,
      max:0,
      step:0,
      findScroller:false,
      findDis:false,
      stopPro:true,
    }, this.props.option)
    // debugger
    this.alloyTouch = new AlloyTouch({
      touch,
      target,
      vertical,
      min,
      touchMove:_.throttle(function(){
          touchMove(this,arguments)
        },intervals),
      ...option
    })
    initCallback && typeof initCallback === 'function' && initCallback(this.alloyTouch)
  }

  render() {
    let { onClick } = this.props;
    return (
      <div className={this.props.className} ref="touch"  style={this.props.style} onClick={onClick}>
        <div ref="target">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Swipe2.defaultProps={
  min:0,
  vertical:false,
  intervals:300,//间隔时间
  onClick:function(){},
  option: {
    property:"translateX",
    width:false,
    max:0,
    step:0,
    findScroller:false,
    findDis:false,
    stopPro:true,
  }
}
module.exports = Swipe2