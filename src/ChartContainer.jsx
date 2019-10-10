import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from  './Chart';
import Filters from  './Filters';
import _ from 'lodash';
import styled from 'styled-components';

function ChartContainer() {
    const [filter, setFilter] = useState('');
    const [filterCampaign, setFilterCampaign] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const path = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv'
        const data = await axios.get(path)
        .then(resp => {
            var data = resp.data
                .toString()
                .split('\n')
                .map(e => e.trim())
                .map(e => e.split(',').map(e => e.trim()));
            return data
        })
        const names = data[0]
        const objectZipped = data.map(item => _.zipObject(names, item));
        const sortedData = objectZipped.slice(1).slice(0, -1)
        setData(sortedData);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    function filterCampaignData() {
        let filteredData = []
        if(filter.length){
            filteredData = data.filter(item => item.Datasource === filter);
        } else {
            filteredData = data;
        }
        return filteredData;
    }

    function filterData() {
        let filteredData = filterCampaignData()
        if(filterCampaign.length) {
            if(filteredData.length){
                filteredData = filteredData.filter(item => item.Campaign === filterCampaign);
            } else {
                filteredData = data.filter(item => item.Campaign === filterCampaign);
            }
        } 
        if(!filterCampaign.length && !filter.length) {
            filteredData = data;
        }
        return filteredData;
    }

    if(loading) return <div>Loading...</div> 
    return(
        <MainWrapper>
            <FiltersWrapper>
                <Filters 
                    onChangeDatasource={(e) => setFilter(e.value)} 
                    onChangeCampaign={(e) => setFilterCampaign(e.value)} 
                    data={data} 
                    optionsCampaignData={filterCampaignData()} 
                />
            </FiltersWrapper>
            <ChartWrapper>
                <Chart data={filterData()} />
            </ChartWrapper>
        </MainWrapper>
    )
}

export default ChartContainer;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const FiltersWrapper = styled.div`
    flex: 4;
`

const ChartWrapper = styled.div`
    flex: 8;
`