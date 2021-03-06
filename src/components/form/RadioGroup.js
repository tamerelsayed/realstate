import React from 'react';
import Formsy from 'formsy-react';
import {FormattedMessage} from 'react-intl';
import InputField from './Input';

const RadioGroup = React.createClass({
  mixins: [Formsy.Mixin],

  componentDidMount() {
    const value = this.props.value;
    this.setValue(value);
    this.setState({value});
  },

  changeValue(value) {
    this.setValue(value);
    this.setState({value});
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    const errorMessage = this.getErrorMessage();
    const { name, items } = this.props;

    return (

      <div className={className}>
        {items.map((item, i) => (

          <div key={i} className="radio-inline">
            <label>
              <input
                type="radio"
                name={name}
                onChange={this.changeValue.bind(this, item.value)}
                checked={this.state.value === item.value}
              />
              <FormattedMessage id={`accountType.${item['title']}`}/>

            </label>
          </div>
        ))
        }
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

export default RadioGroup;
