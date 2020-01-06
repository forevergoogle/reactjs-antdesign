import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Icon, Button } from 'antd';
import './index.less';

const { Title, Text } = Typography;

class NotFoundPage extends Component {
    render() {
        return (
            <div className="content-wrapper min-height-home-page" style={{height: 100 + 'vh'}}>
                <section className="content d-center">
                    <div className="bg-notfound"></div>
                    <div className="pull-left">
                        <Title level={3}>404 - Oops! Page not found.</Title>
                        <Text>Sorry, the page you visited does not exist</Text>
                        <Button type="primary" className="d-block mt-10">
                            <Link to="/">
                                <Icon type="left" />Go back
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        );
    }
}

export default NotFoundPage;
