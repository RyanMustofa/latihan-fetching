import React from "react";
import axios from "axios";
import Props from "../component/Props";
import "materialize-css/dist/js/materialize.min.js";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            search: "",
            loading: true
        };
    }
    componentDidMount() {
        axios
            .get(
                "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.detik.com%2F"
            )
            .then(res => res.data)
            .then(data =>
                this.setState({
                    datas: data.items,
                    loading: false
                })
            )
            .catch(err => {
                this.setState({
                    loading: true
                });
            });
    }
    handleSearch = e => {
        this.setState({
            search: e.target.value
        },() => console.log(this.state.search));
    };
    render() {
        const { datas,search } = this.state
        const filterSearch = datas.filter(datas =>
            datas.title.toLowerCase().includes(search.toLowerCase())
        );
        if (this.state.loading === true) {
            return (
                <center>
                    <div className="section"></div>
                    <div className="section"></div>
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                    <h4>LOADING...</h4>
                </center>
            );
        }
        return (
            <div>
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue">
                            <a href="#" class="brand-logo center">
                                Detik News
                            </a>
                        </div>
                    </nav>
                </div>

                <div class="container">
                    <nav>
                        <div class="nav-wrapper white">
                            <div class="input-field">
                                <input
                                    id="search"
                                    name="search"
                                    onChange={this.handleSearch}
                                    type="search"
                                    required
                                />
                                <label class="label-icon" for="search">
                                    <i class="material-icons black-text">
                                        search
                                    </i>
                                </label>
                                <i class="material-icons black-text">close</i>
                            </div>
                        </div>
                    </nav>
                </div>
                {filterSearch.map(data => {
                    return <Props data={data} />;
                })}
            </div>
        );
    }
}

export default Dashboard;
