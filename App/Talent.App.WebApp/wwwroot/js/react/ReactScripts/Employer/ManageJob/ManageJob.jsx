import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Header, Container, Icon, Dropdown, DropdownMenu, DropdownItem, Input, Pagination, Grid } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            expiredJobsList: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                sortbyDate: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",

        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.loadData();
    };

    loadData(callback) {
        const data = Object.assign({}, this.state.filter, this.state.sortBy)
        const numberOfJobs = this.state.loadJobs
        //console.log(data);
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: data,
            success: function (res) {
                console.log(res.myJobs);
                //console.log(res.expiredJobs)
                this.setState({ loadJobs: res.myJobs });
                this.setState({ expiredJobsList: res.expiredJobs })
                this.setState({totalPages: numberOfJobs.length})
            }.bind(this)
        })
        this.init()

    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    handleChange(e) {
        if (e.target.name === 'showActive') {
            this.setState(Object.assign(this.state.filter, { showActive: !this.state.filter.showActive }))
        }
        if (e.target.name === 'showClosed') {
            this.setState(Object.assign(this.state.filter, { showClosed: !this.state.filter.showClosed }))
        }
        if (e.target.name === 'showDraft') {
            this.setState(Object.assign(this.state.filter, { showDraft: !this.state.filter.showDraft }))
        }
        if (e.target.name === 'showExpired') {
            this.setState(Object.assign(this.state.filter, { showExpired: !this.state.filter.showExpired }))
        }
        if (e.target.name === 'showUnexpired') {
            this.setState(Object.assign(this.state.filter, { showUnexpired: !this.state.filter.showUnexpired }))
        }

        this.loadData();
    }

    handleDateFilter(e, data) {
        console.log(data.value);
        if (data.value === 'Oldest first') {
            this.setState(Object.assign(this.state.sortBy, { sortbyDate: '' }))
            this.loadData();
        }
        if (data.value === 'Newest first') {
            this.setState(Object.assign(this.state.sortBy, { sortbyDate: 'desc' }))
            this.loadData();
        }
    }


    render() {
        const dateFilterOptions =
            [
                { text: 'Newest first', value: 'Newest first' },
                { text: 'Oldest first', value: 'Oldest first' }

            ]




        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <React.Fragment>

                    <div className='ui container'>
                        <Header as='h1'> List of Jobs </Header>
                        <div className='ui container'>
                            <Icon name='filter'></Icon>
                            <span>
                                Filter:&nbsp;
                                <Dropdown inline text='Choose filter'>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Input
                                                style={{ padding: '0px 8px' }}
                                                name='showActive' type='checkbox'
                                                checked={this.state.filter.showActive ? true : false}
                                                onClick={this.handleChange}>
                                            </Input>
                                            Active
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Input
                                                style={{ padding: '0px 8px' }}
                                                name='showClosed' type='checkbox'
                                                checked={this.state.filter.showClosed ? true : false}
                                                onClick={this.handleChange}>
                                            </Input>
                                            Closed
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Input
                                                style={{ padding: '0px 8px' }}
                                                name='showDraft' type='checkbox'
                                                checked={this.state.filter.showDraft ? true : false}
                                                onClick={this.handleChange}>
                                            </Input>
                                            Draft
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Input
                                                style={{ padding: '0px 8px' }}
                                                name='showExpired' type='checkbox'
                                                checked={this.state.filter.showExpired ? true : false}
                                                onClick={this.handleChange}>
                                            </Input>
                                            Expired
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Input
                                                style={{ padding: '0px 8px' }}
                                                name='showUnexpired'
                                                type='checkbox'
                                                checked={this.state.filter.showUnexpired ? true : false}
                                                onClick={this.handleChange}>
                                            </Input>
                                            Unexpired
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </span>
                            <Icon name='calendar alternate outline'></Icon>
                            <span>
                                Sort by date:&nbsp;
                                <Dropdown inline defaultValue={dateFilterOptions[0].value} options={dateFilterOptions} onChange={this.handleDateFilter}>


                                </Dropdown>
                            </span>
                        </div>
                        {this.state.loadJobs.length == 0 ? <Container className='row-padded'>No Jobs Found</Container> :
                            <JobSummaryCard
                                jobsData={this.state.loadJobs}
                                expiredJobs={this.state.expiredJobsList}
                            />
                        }
                       <div className='text center'>
                        <Pagination
                                defaultActivePage={1}
                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                totalPages={1}
                            />
                        </div>
                       
                      
                    </div>

                </React.Fragment>
            </BodyWrapper>
        )
    }
}