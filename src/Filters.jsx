import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import _ from 'lodash';
import styled from 'styled-components';

function Filters(props) {
    function setCampaignOptions() {
        const { optionsCampaignData } = props;
        const dataKeysCampaign = _.keys(_.groupBy(optionsCampaignData, (resp) => resp.Campaign))
        const optionsCampaign = dataKeysCampaign.map(item => { return { label: item, value: item }})
        return optionsCampaign;
    }

    function setDatasourceOptions() {
        const { data } = props;
        const dataKeys = _.keys(_.groupBy(data, (resp) => resp.Datasource))
        const optionsDatasource = dataKeys.map(item => { return { label: item, value: item }}) 
        return optionsDatasource;
    }

    const { onChangeDatasource, onChangeCampaign } = props;

    return(
        <MainWrapper>
            <h3>Filter dimension values</h3>
            <h5>Datasources</h5>
            <Select options={setDatasourceOptions()} onChange={onChangeDatasource} />
            <h5>Campaigns</h5>
            <Select options={setCampaignOptions()} onChange={onChangeCampaign} />
        </MainWrapper>
    )
}

Filters.propTypes = {
    onChangeDatasource: PropTypes.func.isRequired,
    onChangeCampaign: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        Date: PropTypes.string, 
        Datasource: PropTypes.string, 
        Campaign: PropTypes.string,
        Clicks: PropTypes.string, 
        Impressions: PropTypes.string,
    })).isRequired,
    optionsCampaignData: PropTypes.arrayOf(PropTypes.shape({
        Date: PropTypes.string, 
        Datasource: PropTypes.string, 
        Campaign: PropTypes.string,
        Clicks: PropTypes.string, 
        Impressions: PropTypes.string,
    })).isRequired,
}

export default Filters;

const MainWrapper = styled.div`
    height: 100%; 
    margin-right: 20px;
    padding: 15px;
    background-color: lightblue; 
`