import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            categories: [],
            loading: true,
            request: {
                filter: {
                    date: "",
                    status: "",
                    idCategory: 0
                },
                order: {
                    orderBy: null,
                    ascending: false
                }
            }
        };

        this.populateEvents = this.populateEvents.bind(this);
        this.populateCategories = this.populateCategories.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }

    componentDidMount() {
        this.populateCategories();
        this.populateEvents();
    }

    handleDateChange(event) {
        var newRequest = this.state.request;
        newRequest.filter.date = event.target.value;
        this.setState({ request: newRequest });
    }

    handleStatusChange(event) {
        var newRequest = this.state.request;
        newRequest.filter.status = event.target.value;
        this.setState({ request: newRequest });
    }

    handleCategoryChange(event) {
        var newRequest = this.state.request;
        newRequest.filter.idCategory = event.target.value;
        if (newRequest.filter.idCategory !== null) {
            newRequest.filter.idCategory = parseInt(newRequest.filter.idCategory);
        }

        this.setState({ request: newRequest });
    }

    changeOrder(orderBy) {
        var newRequest = this.state.request;
        if (newRequest.order.orderBy !== orderBy) {
            newRequest.order.orderBy = orderBy;
            newRequest.order.ascending = true;

            this.setState({ request: newRequest });
            this.populateEvents();
            return;
        }

        if (newRequest.order.ascending) {
            newRequest.order.ascending = false;

            this.setState({ request: newRequest });
            this.populateEvents();
            return;
        }

        newRequest.order.orderBy = null;

        this.setState({ request: newRequest });
        this.populateEvents();
    }

    static renderEventsTable(events, request, changeOrder) {
        function formatDate(dateParam) {
            var date = dateParam.toLocaleString();
            date = date.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2}).*/gi, "$3/$2/$1");
            return date;
        }

        function getDateEvent(event) {
            var lastGeometry = event.geometries[event.geometries.length - 1];
            return formatDate(lastGeometry.date);
        }

        function changeOrderCategory() {
            changeOrder('category');
        }

        function changeOrderStatus() {
            changeOrder('status');
        }

        function changeOrderDate() {
            changeOrder('date');
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            <div className="cursorPointer" onClick={changeOrderCategory}>
                                <i className={(request.order.orderBy !== 'category' ? 'fas fa-sort' : (request.order.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down'))}></i> Categories
                            </div>
                        </th>
                        <th>
                            <div className="cursorPointer" onClick={changeOrderStatus}>
                                <i className={(request.order.orderBy !== 'status' ? 'fas fa-sort' : (request.order.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down'))}></i> Status
                            </div>
                        </th>
                        <th>
                            <div className="cursorPointer" onClick={changeOrderDate}>
                                <i className={(request.order.orderBy !== 'date' ? 'fas fa-sort' : (request.order.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down'))}></i> Date
                            </div>
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className={(event.closed != null ? 'table-secondary' : '')}>
                            <td>{event.title}</td>
                            <td>
                                {event.categories.map(category => category.title).join(', ')}
                            </td>
                            <td>{event.closed != null ? 'Closed' : 'Open'}</td>
                            <td>{getDateEvent(event)}</td>
                            <td>
                                <NavLink tag={Link} className="text-dark" to={"/event/"+event.id}><i className="fas fa-eye"></i></NavLink>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading events...</em></p>
            : Home.renderEventsTable(this.state.events, this.state.request, this.changeOrder);

        return (
            <section>
                <h1>EONET</h1>
                <br />
                <form>
                    <div className="row">
                        <div className="col col-xs-12 col-sm-3">
                            <div className="form-group">
                                <label htmlFor={"dateFilter"}><b>Date</b></label>
                                <input type="date" className="form-control" id="dateFilter" name="dateFilter" value={this.state.request.filter.date} onChange={this.handleDateChange} />
                            </div>
                        </div>
                        <div className="col col-xs-12 col-sm-3">
                            <div className="form-group">
                                <label htmlFor={"statusFilter"}><b>Status</b></label>
                                <select className="form-control" id="statusFilter" name="statusFilter" value={this.state.request.filter.status} onChange={this.handleStatusChange}>
                                    <option value="">Select</option>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <div className="col col-xs-12 col-sm-3">
                            <div className="form-group">
                                <label htmlFor={"categoryFilter"}><b>Category</b></label>
                                <select className="form-control" id="categoryFilter" name="categoryFilter" value={this.state.request.filter.idCategory} onChange={this.handleCategoryChange}>
                                    <option value="">Select</option>
                                    {this.state.categories.map((category) => (
                                        <option value={category.id} key={category.id} > {category.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col col-xs-12 col-sm-3">
                            <div className="form-group">
                                <label>&nbsp;</label>

                                <button type="button" className="btn btn-primary form-control" onClick={this.populateEvents}>Search</button>
                            </div>
                        </div>
                    </div>
                </form>
                {contents}
            </section>
        );
    }

    async populateEvents() {
        this.setState({ events: [], loading: true });

        var request = {
            filter: {
                date: (this.state.request.filter.date !== "") ? this.state.request.filter.date : null,
                status: (this.state.request.filter.status !== "") ? this.state.request.filter.status : null,
                idCategory: (this.state.request.filter.idCategory !== 0) ? this.state.request.filter.idCategory : null,
            },
            order: {
                orderBy: this.state.request.order.orderBy,
                ascending: this.state.request.order.ascending
            }
        };

        const response = await fetch('api/Event/GetEvents', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const data = await response.json();
        this.setState({ events: data, loading: false });
    }

    async populateCategories() {
        const response = await fetch('api/Category/GetCategories', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({ categories: data });
    }
}
