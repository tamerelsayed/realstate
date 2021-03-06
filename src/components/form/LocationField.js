import React from 'react';
import ReactFireMixin from 'reactfire';
import _ from 'lodash';
import {FormattedMessage,intlShape, injectIntl} from 'react-intl';
import SelectField from './Select';
import Loader from '../Loader';


const LocationField = React.createClass({

  mixins: [ReactFireMixin],
  propTypes: {
    intl: intlShape.isRequired,
    onChange: React.PropTypes.func,
    onLoaded: React.PropTypes.func,
    title: React.PropTypes.string,
    editMode: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      editMode: false
    }
  },
  getInitialState: function(){
    return {
      loaded: false
    }

  },
  componentWillMount: function(){
    const {formatMessage} = this.props.intl;
    firebase.database().ref('locations').once('value', (snapshot)=>{
      let value = snapshot.val();
      let locations = [];

      _.forEach(value, function(v, k){
        locations.push({value: k, title: formatMessage({id: `locations.${k}`})});
      });

      if(this.props.onLoaded && !this.props.editMode)
        this.props.onLoaded(locations[0].value);


      this.setState({loaded: true, locations});
    });

  },
  onChange: function(e){
    if(this.props.onChange)
      this.props.onChange(e.currentTarget.value)
  },
  render: function(){
    const {formatMessage} = this.props.intl;
    let locations = this.state.locations;

    if(!this.state.loaded)
      return <Loader title="loading"/>;


    let selectedLocation = this.props.editMode ? this.props.value : locations[0].value;

    return ( <SelectField className={this.props.className}
                          title={this.props.title}
                          name="location"
                          options={locations}
                          validationErrors={{
                    isExisty: formatMessage({id: "forms.validations.generic.required"})
                    }}
                          validations={{
                    isExisty:true
                    }}
                          onChange={this.onChange}
                          value={selectedLocation}
                          required/>);


  }

});

export default injectIntl(LocationField);
