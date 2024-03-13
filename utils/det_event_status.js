const status = (startDt, endDt, startRegDt, endRegDt) => {
    const currentDate = new Date();
    const startDate = new Date(startDt);
    const endDate = new Date(endDt);
    const startRegDate = new Date(startRegDt);
    const endRegDate = new Date(endRegDt);

    let status = 'Finished';
    if (currentDate < startRegDate) status = 'Upcoming';
    else if (startRegDate <= currentDate && currentDate < endRegDate) status = 'Open Registration';
    else if (endRegDate < currentDate && currentDate < startDate) status = 'Closed Registration';
    else if (startDate <= currentDate && currentDate < endDate) status = 'Ongoing';
    else if (endDate < currentDate) status = 'Finished';
    else status = 'Finished';

    return status;
}

module.exports = status;