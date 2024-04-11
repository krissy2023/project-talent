import React from 'react';
import Cookies from 'js-cookie';
import { Popup, CardGroup, Card, CardHeader, CardMeta, CardContent, CardDescription, Label, Icon, Button, ButtonGroup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        const jobs = this.props.jobsData;
        const expiredJobs = this.props.expiredJobs;
        // console.log(expiredJobs);

        return (
            <div className='cards-padding'>
                <CardGroup>
                    {
                        jobs.map((job) =>
                            <Card key={job.id} className='card-summary'>
                                <CardContent>
                                    <CardHeader>{job.title.length > 0 ? job.title : 'Job'}</CardHeader>
                                    <Label ribbon='right' color='black'> <Icon name='user'></Icon> 0 </Label>
                                    <CardMeta>
                                        <span>{job.location.city == 0 ? '' : job.location.city + ','} {job.location.country}</span>
                                    </CardMeta>
                                    <CardDescription className='job-summary'>
                                        {job.summary}
                                    </CardDescription>
                                </CardContent>

                                <CardContent extra>
                                    <Label size='medium' color='red'>Expired</Label>
                                    <ButtonGroup floated='right' size='mini'>
                                        <Button basic color='blue'><Icon name='ban' />Close</Button>
                                        <Button basic color='blue'><Icon name='edit' />Edit</Button>
                                        <Button basic color='blue'><Icon name='copy outline' />Copy</Button>
                                    </ButtonGroup>
                                </CardContent>
                            </Card>
                        )
                    }
                </CardGroup>
            </div>



        )
    }
}