import React, {Component} from 'react';

class PlanetSearchForm extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
            <form onSubmit={this.props.getPlanet}>
              <input class="searchField" placeholder="Search a planet from the collection" type="text" name="planetSearchName" maxLength="32"/>
              <button class="btn btn-primary searchBtn">Search</button>
            </form>
          </div>
        );
    }
}

export default PlanetSearchForm;