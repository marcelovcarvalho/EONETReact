import React, { Component } from 'react';

export class Event extends Component {
    static displayName = Event.name;


    constructor(props) {
        super(props);

        this.state = { id: props.match.params.id, event: null, loading: true };
        this.getEventById = this.getEventById.bind(this);
    }

    componentDidMount() {
        this.getEventById(this.state.id);
    }

    static renderEventDetail(event) {

        function formatDate(dateParam) {
            var date = dateParam.toLocaleString();
            date = date.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2}).*/gi, "$3/$2/$1");
            return date;
        }

        return (
            <div>
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>ID</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            {event.id}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>Title</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            {event.title}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>Categories</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            {event.categories.map(category => category.title).join(', ')}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>Status</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            {event.closed !== null?'Closed - '+formatDate(event.closed):'Open'}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>Description</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            {event.description}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <b>Sources</b>
                        </div>
                        <div className="col col-xs-12 col-sm-9">
                            <ul>
                                {event.sources.map((source) => (
                                    <li key={source.id}>
                                        <a target="_blank" href={source.url}>{source.id}</a>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading event...</em></p> : Event.renderEventDetail(this.state.event);

        return (
            <section>
                <h1>Event Detail</h1>

                <br />
                <br />
                
                {contents}

            </section>
        );
    }

    async getEventById(idEvent) {
        const response = await fetch('api/Event/GetEventById?id='+idEvent, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({ event: data, loading: false });
    }
}
