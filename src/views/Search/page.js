import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat } from 'libs/util'
import Swipe2 from "components/swipe/swipe2";
import { fetchPosts } from "components/common/fetch"

import { ProductList, Icon } from 'ui'

class Search extends Component {
  pageName = '112'
  searchList = Array(8).fill(
    {
        "id": "545016985939222",
        "name": "女装新品OL气质百搭修身女式衬衫女长袖衬衣修身显瘦T恤上衣小衫",
        "finalPrice": "228.00",
        "imgUrl": "http://img04.taobaocdn.com/bao/uploaded/i4/TB17yvEPpXXXXbLapXXXXXXXXXX_!!0-item_pic.jpg",
        "url": "https://s.click.taobao.com/t?e=m%3D2%26s%3D6U%2BM%2Fl6AO1YcQipKwQzePOeEDrYVVa64K7Vc7tFgwiHjf2vlNIV67vq9YI6Cg0b4P9LlJoUu0c7TjcZxo8N%2B6RlgXezt806SOLGS04yfrAWe4rHEIZXEepoCS3A%2FeKR0hJCy0erBlaIqlzVAgtxLxtbBzNVhBK5mxg5p7bh%2BFbQ%3D&pvid=10_101.81.23.1_4269_1490343579054",
        "orderNum": "95",
        "source": "tmall",
        "rebateValue": "3000"
      }
  )
  _searchList = []
  swipe = null
  constructor(props) {
    super(props)
    this.state = {
      isSearch: false,
      hasResult: false,
      searchText: '',
      sortActive: 0,
      isAsc: false,
      isSearchbarShow: true, 
      searchList: [],
      tags: [],
      recList: [],
      suggest: [],
      
      recPage: 1,
      recLoading: false,

      searchPage: 1
      
    }
    // props.getBannerList(20)
    // this.searchList = this.searchList.map((item)=>{
    //   let _item = Object.assign({}, item) 
    //   _item['orderNum'] = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    //   _item['finalPrice'] = Math.floor(Math.random() * (9000 - 100 + 1) + 100)
    //   return _item
    // })
    // this._searchList = this.searchList.slice()


  }

  
  componentWillMount() {
    this.getTags()
    this.getRecList()
  }
  

  getData = () => {
    let { loading, page, isEnd } = this.props
    
    if ((page !== 0 && loading === true) || (isEnd)) {
      return;
    }
  }

  getTags = () => {
    fetchPosts('/wechat/stuff/search/keyList.do', {limit: 6}, 'POST')
      .then(data => {
        if(data && data.success && data.data) {
          this.setState({
            tags: data.data
          })
        }
      })
  }

  getRecList = () => {
    let {recPage} = this.state
    this.setState({
      recLoading: true
    })
    fetchPosts('/wechat/stuff/recommd/searchRec.do', {page: recPage++, size: 6}, 'GET')
      .then(data => {
        if(data && data.success && data.data) {
          this.setState({
            recList: data.data,
            recPage,
            recLoading: false
          })
        }
      })
  }

  doSearch = () => {
    let {searchPage,searchText,sortMode,searchList} = this.state
    sortMode = sortMode || 'sort:normal'
    fetchPosts('/wechat/stuff/search.do', {page: searchPage++, kw:searchText, size: 6, sort:sortMode}, 'GET')
      .then(data => {
        if(data && data.success && data.data) {
          this.setState({
            isSearch: true,
            hasResult: data.data.length>0,
            searchList: this.state.searchPage>1?searchList.concat(data.data):data.data,
            searchPage
          })
        }
      })
  }

  touchMove = (that, args) => {
    let preLoaction = args[0].target[location] || 0
    if (isNaN(args[1])) {
      this.swipe.to(that.start)
    }
    args[0].target[location] = args[1]
    this.setState({
      isSearchbarShow: args[1] > preLoaction
    })
    // console.log(`preLoaction:${preLoaction} ,value:${args[1]}` );
    if (that.min - args[1] > 30) {
      this.doSearch();
    }
  }

  searchHandler = () => {
    let { searchText, searchPage } = this.state
    this.doSearch()
  }

  searchInputChangeHandler = e => {
    this.setState({
      searchText: e.target.value
    })
  }

  searchInputClearHandler = e => {
    e.target.previousSibling.focus()
    this.setState({
      searchText: ''
    })
  }

  tagClickHandler = e => {
    let txt = e.target.textContent
    this.setState({
      searchText: txt
    }, () => {
      this.searchHandler()
    })
  }

  sortHandler = e => {
    let active = e.target.dataset.active
    let isAsc = false
    if (this.state.sortActive == active) {
      isAsc = !this.state.isAsc
      this.setState({
        isAsc
      })
    } else {
      this.setState({
        sortActive: e.target.dataset.active,
        isAsc
      })
    }
    
    if (active == 0) {
      // this.searchList = this._searchList.slice()
      this.setState({
        searchPage: 1
      }, () => {
        this.doSearch()
      })
    } else {
      this.setState({
        searchPage: 1,
        sortMode: `sort:${active == 1 ? 'order_num' : 'final_price'}:${this.state.isAsc?'asc':'desc'}`
      }, () => {
        this.doSearch()
      })
      // this.searchList.sort((a, b)=>{
      //   let result = goodsCompare(a, b, active == 1 ? 'orderNum' : 'finalPrice')
      //   return isAsc ? result : 0 - result
      // })
    }
    this.swipe.to(0, 100)
  }

  refreshHandler = e => {
    this.getRecList()
  }

  render() {
    let { loading, page, isEnd } = this.props;
    let { tags, recList, recLoading, searchList } = this.state
    let i = 0, j = this.props.productList.length, totalPrice = 0, totalSb = 0;

    let props = {
      className: "product-list",
      min: 'auto',
      vertical: true,
      touchMove: this.touchMove,
      intervals: 300,
      initCallback: swipe => {
        this.swipe = swipe
      },
      option: {
        step: 0,
        stopPro: true,
        property: "translateY"
      }
    }
// debugger
    return (
        <div styleName="home-container">
          <form data-search-list=".search-here" data-search-in=".item-title" 
            styleName={classNames('searchbar','searchbar-active',{'searchbar-hide':!this.state.isSearchbarShow,'searchbar-not-empty':this.state.searchText})}>
            <div styleName="searchbar-input">
              <input type="search" placeholder="搜索好货；不能直接搜索商品链接" styleName="" value={this.state.searchText} onChange={this.searchInputChangeHandler}/>
              <a styleName="searchbar-clear" onClick={this.searchInputClearHandler}></a>
            </div>
            <a styleName="searchbar-cancel" style={{display: 'block', marginRight: '0px'}}
              onClick={this.searchHandler}>搜索</a>
          </form>
          <div className={classNames("normal-container",{hide:this.state.isSearch})}>
            <div styleName="hot-search-container">
              <div styleName="hot-title">
                <Icon name="hot" color="#908F9B" /> 热门搜索
              </div>
              <div styleName="hot-list">
              {
                tags.map((item, index) => {
                  return <div styleName="hot-tag" key={index} onClick={this.tagClickHandler}>{item.key}</div>
                })
              }
              </div>
            </div>
            <div styleName="recommend-title">
              <div styleName="title">
                <Icon name="star-empty2" color="#908F9B" /> 与您搜索过的关键字相关推荐
              </div>
              <div styleName="refresh" onClick={this.refreshHandler}>
                <Icon name="refresh" styleName={classNames({loading:recLoading})} color="#ff7022" /> <span>换一批</span>
              </div>
            </div>
            <ProductList 
              listConfig={{ 
                temp: 'search_rec', 
                isNoMore: true
              }} 
              listData={recList}
              eventConfig={{
                pageName: this.pageName,
                model: 'search_recommend_products'
              }}
            />
          </div>
          
          {
            this.state.isSearch && this.state.hasResult ? 
              <div className={classNames("search-result-container",{hide:!this.state.isSearch})}>
                <div styleName="list-sort">
                  <div styleName={classNames("sort-item",{'active':this.state.sortActive==0})} data-active="0" onClick={this.sortHandler}>全部</div>
                  <div styleName={classNames("sort-item",{'active':this.state.sortActive==1})} data-active="1" onClick={this.sortHandler}>销量
                    <span styleName={classNames("sort-btns",{asc:this.state.isAsc,desc:!this.state.isAsc})}>
                      <Icon name="arrow-up" styleName="asc" color="#35353f" size="6" />
                      <Icon name="arrow-down" styleName="desc" color="#35353f" size="6" />
                    </span>
                  </div>
                  <div styleName={classNames("sort-item",{'active':this.state.sortActive==2})} data-active="2" onClick={this.sortHandler}>价格
                    <span styleName={classNames("sort-btns",{asc:this.state.isAsc,desc:!this.state.isAsc})}>
                      <Icon name="arrow-up" styleName="asc" color="#35353f" size="6" />
                      <Icon name="arrow-down" styleName="desc" color="#35353f" size="6" />
                    </span>
                  </div>
                </div>
                <Swipe2 {...props}>
                  <ProductList 
                    listConfig={{ 
                      temp: 'normal', 
                      isNoMore: isEnd
                    }} 
                    listData={searchList}
                    eventConfig={{
                      pageName: this.pageName,
                      model: 'search_result_products'
                    }}
                  />
                </Swipe2>
              </div>
              : 
              this.state.isSearch && !this.state.hasResult ? 
                <div className={classNames("search-result-container",'no-result',{hide:!this.state.isSearch})}><p>没有搜到您要找的商品</p></div>
              : ''
          }
            
        </div>

    )
  }

}

Search.defaultProps = {
}

function goodsCompare(a, b, key) {
  return key == 'finalPrice' ? parseFloat(a[key]) - parseFloat(b[key]) : parseInt(a[key]) - parseInt(b[key])
}

function mapStateToProps(state) {
  return state.gatherGoods;
}

function mapDispatchToProps(dispatch) {
  return {
    action(type) {
      dispatch(type);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Search, styles, {allowMultiple: true}));
