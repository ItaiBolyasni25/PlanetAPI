import React, {Component} from 'react';


class PlanetCreateForm extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
                <a class="btn btn-primary" data-toggle="collapse" href="#collapsedForm" role="button" aria-expanded="false" aria-controls="collapsedForm">
                    Insert new planet to the collection
                </a>
            <div id="collapsedForm" class="collapse">
                <div class="card card-body mt-3">
                    <form method="POST" action="http://localhost:5000/planets/create">
                        <div class="form-group">
                         <input class="searchField" placeholder="Planet Name" type="text" name="planetName" required minLength="3" maxLength="32"/>
                        </div>

                        <div class="form-group">
                            <input class="searchField" placeholder="Solar System Name" type="text" name="solarSystem" required minLength="3" maxLength="32"/>
                        </div>
                    <button class="btn btn-success searchBtnLarge">Add</button>
                    </form>
                </div>
            </div>

          </div>
        );
    }
}

export default PlanetCreateForm;