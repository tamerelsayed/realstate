import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import Image from './Image';
import {FormattedMessage,intlShape,injectIntl,FormattedHTMLMessage} from 'react-intl';
import { If, Then, Else } from 'react-if';


const Property = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    intl: intlShape.isRequired,
  },
  contextTypes: {
    lang: React.PropTypes.string
  },
  renderDetails: function(){
    let data = "";

    switch(this.props.data.type){
      case 'apartement':
        data = <div>
          <span className="bed">{this.props.data.info.bedroom}</span>
          <span className="bath">{this.props.data.info.bathroom}</span>
          <span className="garage">{this.props.data.info.garage}</span>
        </div>;
        break;
    }
    return data;
  },
  render: function(){
    let lang = this.context.lang;
    let itemID = this.props.id;
    let images = this.props.data.images;
    let currency = this.props.intl.formatMessage({id: "settings.currency"});
    let spaceMeasure = this.props.intl.formatHTMLMessage({id: "settings.space"});

    return (
      <div className="item">
        <div className="item-header clearfix">
          <h3><Link to={`/${lang}/properties/${itemID}`}>{this.props.data.title}</Link>
          </h3>
        </div>
        <figure>
          {_.isArray(images) ?
            <Image url={`images/${itemID}/${images[0]}`} alt="" className="img-responsive"/> :
            <img src="dist/images/items/10.png" alt="" className="img-responsive"/>
          }
          <div className="overlay">
            <Link to={`/${lang}/properties/${itemID}`} className="btn btn-detail">Detail</Link>
          </div>
        </figure>

        <div className="item-detail">
          <div className="left">
              <span className="place">
                <i className="fa fa-map-marker"/>{this.props.data.location}
              </span>

            {this.renderDetails()}

          </div>
          <div className="right">
            <span className="area"> <FormattedHTMLMessage id="property.space"
                                                          values={{space:this.props.data.space,measure:spaceMeasure}}/> <sup>2</sup></span>
            <span className="price"><FormattedMessage id="property.price"
                                                      values={{currency,price:this.props.data.price}}/> </span>
          </div>
        </div>
      </div>
    );
  }
});

export default injectIntl(Property);
