import React, { useMemo } from 'react';
import '../css_folder/Report.css';
import Sidebar from './Sidebar';

const Report = () => {
    const generateGraphData = useMemo(() => {
        const labels = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Hostel E'];
        const data = labels.map(() => Math.floor(Math.random() * 100)); // Random data for demo
        return { labels, data };
    }, []);
    //..
    const { labels, data } = generateGraphData;

    const barGraph = useMemo(() => (
        <div className="graph-container">
            <h2 className="graph-title">Bar Chart</h2>
            <div className="bar-chart">
                {labels.map((label, index) => (
                    <div key={index} className="bar">
                        <div className="bar-inner" style={{ height: `${data[index]}%` }}>
                            <span className="bar-value">{data[index]}%</span>
                        </div>
                        <span className="bar-label">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    ), [labels, data]);

    const pieGraph = useMemo(() => {
        const total = data.reduce((acc, value) => acc + value, 0);
        let cumulativePercent = 0;

        const getCoordinatesForPercent = (percent) => {
            const x = Math.cos(2 * Math.PI * percent) * 16;
            const y = Math.sin(2 * Math.PI * percent) * 16;
            return [x, y];
        };

        return (
            <div className="graph-container">
                <h2 className="graph-title">Pie Chart</h2>
                <svg viewBox="-16 -16 32 32" width="200" height="200">
                    {data.map((value, index) => {
                        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                        cumulativePercent += value / total;
                        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                        const largeArcFlag = value / total > 0.5 ? 1 : 0;
                        const pathData = `M 0 0 L ${startX} ${startY} A 16 16 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

                        return (
                            <path key={index} d={pathData} fill={`hsl(${index * 60}, 70%, 50%)`} stroke="#fff" strokeWidth="0.5" />
                        );
                    })}
                </svg>
            </div>
        );
    }, [data]);

    const lineGraph = useMemo(() => {
        const points = data.map((value, index) => `${index * 20},${50 - value / 2}`).join(' ');

        return (
            <div className="graph-container">
                <h2 className="graph-title">Line Chart</h2>
                <svg viewBox="0 0 100 50" width="400" height="200" className="line-chart">
                    <polyline
                        fill="none"
                        stroke="#007bff"
                        strokeWidth="2"
                        points={points}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {data.map((value, index) => (
                        <circle key={index} cx={index * 20} cy={50 - value / 2} r="3" fill="#007bff" stroke="#fff" strokeWidth="1" />
                    ))}
                </svg>
            </div>
        );
    }, [data]);

    const dataTable = useMemo(() => (
        <div className="data-table">
            <h2 className="graph-title">Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Hostel</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {labels.map((label, index) => (
                        <tr key={index}>
                            <td>{label}</td>
                            <td>{data[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ), [labels, data]);

    const keyMetrics = useMemo(() => (
        <div className="key-metrics">
            <div className="metric">
                <div className="metric-title">Total Value</div>
                <div className="metric-value">{data.reduce((a, b) => a + b, 0)}</div>
            </div>
            <div className="metric">
                <div className="metric-title">Average Value</div>
                <div className="metric-value">{(data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)}</div>
            </div>
            <div className="metric">
                <div className="metric-title">Max Value</div>
                <div className="metric-value">{Math.max(...data)}</div>
            </div>
            <div className="metric">
                <div className="metric-title">Min Value</div>
                <div className="metric-value">{Math.min(...data)}</div>
            </div>
        </div>
    ), [data]);

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <div className="row">
                            <div className="col-12">
                                <h1>Report</h1>
                                <div className="overview-section">
                                    <p>This report provides an overview of the key metrics and data visualizations for the hostels.</p>
                                </div>
                                {keyMetrics}
                                {dataTable}
                                <div className='graphs-container'>
                                    {barGraph}
                                    {pieGraph}
                                    {lineGraph}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
