import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import styled from 'styled-components';

function ChartComponent(props) {
    function setDatasets(clicks, impressions){
        return [
            {
                label: "Clicks",
                data: clicks,
                type: 'line',
                fill: false,
                color: 'green',
                borderColor: 'rgba(0, 255, 0, 0.75)',
            },
            {
                label: "Impressions",
                data: impressions,
                type: 'line',
                yAxisID: 'y-axis-1',
                fill: false,
                borderColor: 'rgba(255, 0, 255, 0.75)',
            }
        ]
    }

    function setOptions(clicks, impressions) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                {
                    position: "left",
                    id: "y-axis-0",
                    scaleLabel: {
                        display: true,
                        labelString: 'Clicks',
                        fontSize: 20,
                    },
                    ticks: {
                        suggestedMax: _.max(clicks),
                        suggestedMin: _.min(clicks),
                    },
                },
                {
                    position: "right",
                    id: "y-axis-1",
                    scaleLabel: {
                        display: true,
                        labelString: 'Impressions',
                        fontSize: 20,
                    },
                    ticks: {
                        suggestedMax: _.max(impressions),
                        suggestedMin: _.min(impressions),
                    },
                }
                ]
            }
        }
    }

    function setData(sortedData) {
        const dataGroupedByDate = _.groupBy(sortedData, (resp) => resp.Date)
        const clicks = _.values(_.mapValues(dataGroupedByDate, (o) => _.sumBy(o, (e) => Number(e.Clicks))))
        const impressions = _.values(_.mapValues(dataGroupedByDate, (o) => _.sumBy(o, (e) => Number(e.Impressions))))
        const dates = _.keys(dataGroupedByDate);
        const datasets = setDatasets(clicks, impressions);
        const options = setOptions(clicks, impressions)
        return({
            chartData: {
                labels: dates,
                datasets
            },
            options,
        })
    }
    const { data } = props;
    const filteredData = setData(data);
    return (
        <MainWrapper>
            <ChartTitle>Chart Clicks to Impressions</ChartTitle>
            <Line
                data={filteredData.chartData}
                options={filteredData.options}
            />
        </MainWrapper>
    );
}

ChartComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        Date: PropTypes.string, 
        Datasource: PropTypes.string, 
        Campaign: PropTypes.string,
        Clicks: PropTypes.string, 
        Impressions: PropTypes.string,
    })).isRequired,
}

export default ChartComponent;

const MainWrapper = styled.div`
    height: 100%; 
    width: 100%;
`

const ChartTitle = styled.h2`
    text-align: center;
`