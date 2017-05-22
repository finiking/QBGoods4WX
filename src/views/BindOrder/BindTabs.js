import React, {Component} from 'react'
import {connect} from 'dva'
import styles from './BindTabs.less'
import CSSModules from 'react-css-modules'

class BindTabs extends Component {

    constructor(props) {
        super(props)
        this.state = {
          active: this.props.active
        }
    }

    toggleTabHandler = item => {

      if(item.id !== this.state.active){
        this.setState({
          active: item.id
        });
        this.props.tabsHandler(item);
      }
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {

        return (
            <div className="BindTabs">
              {
                this.props.items.map(
                  (item, i) =>
                    <div key={i}  onClick={this.toggleTabHandler.bind(this, item)} className={this.state.active === item.id ? 'tab-item selected' : 'tab-item'}>{item.name}</div>
                )
              }
            </div>
        )
    }
};

export default CSSModules(BindTabs,styles,{allowMultiple:true});
